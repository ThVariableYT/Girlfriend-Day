"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DefaultMemory } from "./default-memories";

export type MemoryPhoto = {
  id: string;
  url: string;
  caption: string;
  createdAt: number;
  /** true for hardcoded (default) memories — not editable or deletable */
  preset?: boolean;
};

type StoredRecord = {
  id: string;
  blob: Blob;
  caption: string;
  createdAt: number;
};

const DB_NAME = "mau-memories";
const STORE = "photos";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbAll(): Promise<StoredRecord[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve((req.result as StoredRecord[]).sort((a, b) => a.createdAt - b.createdAt));
    req.onerror = () => reject(req.error);
  });
}

async function dbPut(rec: StoredRecord): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(rec);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function dbDelete(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function usePhotoStore(presets: DefaultMemory[] = []) {
  // Hardcoded memories are stable (module-level constant) — build once.
  const presetPhotos = useMemo<MemoryPhoto[]>(
    () =>
      presets.map((p, i) => ({
        id: `preset-${i}`,
        url: p.src,
        caption: p.caption,
        createdAt: i,
        preset: true,
      })),
    [presets]
  );

  const [uploads, setUploads] = useState<MemoryPhoto[]>([]);
  const [ready, setReady] = useState(false);
  const urlsRef = useRef<Set<string>>(new Set());

  const trackUrl = useCallback((url: string) => {
    urlsRef.current.add(url);
  }, []);

  const revokeUrl = useCallback((url: string) => {
    if (urlsRef.current.has(url)) {
      URL.revokeObjectURL(url);
      urlsRef.current.delete(url);
    }
  }, []);

  // load uploads from IndexedDB
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const records = await dbAll();
        if (!mounted) return;
        const mapped = records.map((r) => {
          const url = URL.createObjectURL(r.blob);
          trackUrl(url);
          return { id: r.id, url, caption: r.caption, createdAt: r.createdAt };
        });
        setUploads(mapped);
      } catch {
        /* ignore — fall back to empty */
      } finally {
        if (mounted) setReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [trackUrl]);

  // merged list: presets first, then user uploads
  const photos = useMemo(() => [...presetPhotos, ...uploads], [presetPhotos, uploads]);

  const addPhotos = useCallback(
    async (files: File[]) => {
      const imageFiles = files.filter((f) => f.type.startsWith("image/"));
      const newOnes: MemoryPhoto[] = [];
      for (const file of imageFiles) {
        const id = uid();
        const createdAt = Date.now();
        const caption = "";
        try {
          await dbPut({ id, blob: file, caption, createdAt });
        } catch {
          /* skip on error */
        }
        const url = URL.createObjectURL(file);
        trackUrl(url);
        newOnes.push({ id, url, caption, createdAt });
      }
      if (newOnes.length) {
        setUploads((prev) => [...prev, ...newOnes]);
      }
      return newOnes.length;
    },
    [trackUrl]
  );

  const removePhoto = useCallback(
    async (id: string) => {
      // presets can't be removed
      if (id.startsWith("preset-")) return;
      const target = uploads.find((p) => p.id === id);
      if (target) revokeUrl(target.url);
      try {
        await dbDelete(id);
      } catch {
        /* ignore */
      }
      setUploads((prev) => prev.filter((p) => p.id !== id));
    },
    [uploads, revokeUrl]
  );

  const updateCaption = useCallback(async (id: string, caption: string) => {
    // presets can't be edited
    if (id.startsWith("preset-")) return;
    setUploads((prev) => prev.map((p) => (p.id === id ? { ...p, caption } : p)));
    // persist lazily
    try {
      const db = await openDB();
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        const rec = getReq.result as StoredRecord | undefined;
        if (rec) {
          rec.caption = caption;
          store.put(rec);
        }
      };
    } catch {
      /* ignore */
    }
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      urlsRef.current.clear();
    };
  }, []);

  return { photos, ready, addPhotos, removePhoto, updateCaption };
}
