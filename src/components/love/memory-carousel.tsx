"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Heart, Trash2, ChevronLeft, ChevronRight, Pencil, Check, Camera, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePhotoStore } from "./use-photo-store";
import { defaultMemories } from "./default-memories";
import { Reveal } from "./reveal";

const FALLBACK_RATIO = 16 / 10;

export function MemoryCarousel() {
  const { photos, ready, addPhotos, removePhoto, updateCaption } = usePhotoStore(defaultMemories);
  const { toast } = useToast();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [editingCaption, setEditingCaption] = useState(false);
  const [draftCaption, setDraftCaption] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- adaptive stage sizing ---
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const [wrapW, setWrapW] = useState(0);
  const [maxH, setMaxH] = useState(560);
  const [photoDims, setPhotoDims] = useState<Record<string, { w: number; h: number }>>({});

  useEffect(() => {
    const el = stageWrapRef.current;
    if (!el) return;
    const updateW = () => setWrapW(el.clientWidth);
    updateW();
    const ro = new ResizeObserver(updateW);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const updateH = () => setMaxH(Math.min(window.innerHeight * 0.7, 600));
    updateH();
    window.addEventListener("resize", updateH);
    return () => window.removeEventListener("resize", updateH);
  }, []);

  // Derive a safe index during render so the active photo stays in range.
  const safeIndex =
    photos.length === 0 ? 0 : Math.min(index, photos.length - 1);

  const paginate = useCallback(
    (dir: number) => {
      if (photos.length === 0) return;
      setDirection(dir);
      setIndex((prev) => (prev + dir + photos.length) % photos.length);
      setEditingCaption(false);
    },
    [photos.length]
  );

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > safeIndex ? 1 : -1);
      setIndex(i);
      setEditingCaption(false);
    },
    [safeIndex]
  );

  const onDragEnd = useCallback(
    (_e: unknown, info: PanInfo) => {
      setDragging(false);
      const threshold = 80;
      if (info.offset.x < -threshold) paginate(1);
      else if (info.offset.x > threshold) paginate(-1);
    },
    [paginate]
  );

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const arr = Array.from(files);
      const added = await addPhotos(arr);
      if (added > 0) {
        toast({
          title: added === 1 ? "A memory added" : `${added} memories added`,
          description: "Kept safely in this little world for Mau.",
        });
        // jump to the first newly added photo (appended after presets + uploads)
        setDirection(1);
        setIndex(photos.length);
      } else {
        toast({
          title: "Hmm, couldn't add that",
          description: "Please choose image files only.",
        });
      }
    },
    [addPhotos, photos.length, toast]
  );

  const active = photos[safeIndex];
  const activeDims = active ? photoDims[active.id] : undefined;

  const onImgLoad = useCallback(
    (id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      if (w > 0 && h > 0) {
        setPhotoDims((prev) => (prev[id] ? prev : { ...prev, [id]: { w, h } }));
      }
    },
    []
  );

  const startEdit = useCallback(() => {
    if (!active || active.preset) return;
    setDraftCaption(active.caption);
    setEditingCaption(true);
  }, [active]);

  const saveCaption = useCallback(() => {
    if (!active || active.preset) return;
    updateCaption(active.id, draftCaption.trim());
    setEditingCaption(false);
    toast({ title: "Caption saved" });
  }, [active, draftCaption, updateCaption, toast]);

  // Compute the stage box so it always matches the photo's orientation, capped
  // to a comfortable max height so portrait pictures never take over the screen.
  const ratio =
    activeDims && activeDims.h > 0 ? activeDims.w / activeDims.h : FALLBACK_RATIO;
  let stageW = wrapW;
  let stageH = wrapW > 0 ? wrapW / ratio : 0;
  if (stageH > maxH) {
    stageH = maxH;
    stageW = stageH * ratio;
  }
  const measured = wrapW > 0;

  return (
    <section className="relative z-10 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <p className="font-body text-sm uppercase tracking-[0.4em] text-[oklch(0.5_0.1_30)]">
            moments worth keeping
          </p>
          <h2 className="mt-3 font-serif-display text-4xl italic text-[oklch(0.35_0.08_20)] sm:text-5xl">
            Our Memory Wall
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-[oklch(0.4_0.07_25)]">
            Add our photos from your phone or laptop. They stay here, safe and
            private — just for us. Drag to browse, tap a heart to remember.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="glass-card relative overflow-hidden rounded-[1.75rem] p-3 sm:p-5"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
          >
            {/* drop overlay */}
            <AnimatePresence>
              {dragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-3 z-30 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[oklch(0.6_0.14_30/0.7)] bg-[oklch(0.97_0.03_45/0.9)] backdrop-blur-sm"
                >
                  <ImagePlus className="h-10 w-10 text-[oklch(0.5_0.14_25)]" />
                  <p className="mt-3 font-script text-2xl text-[oklch(0.45_0.12_22)]">
                    drop our memories here
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage wrapper — measures available width */}
            <div ref={stageWrapRef} className="w-full">
              {/* Stage — adapts to the active photo's orientation */}
              <div
                className="relative mx-auto w-full overflow-hidden rounded-2xl bg-[oklch(0.93_0.03_40)]"
                style={
                  measured
                    ? {
                        width: stageW,
                        height: stageH,
                        maxWidth: "100%",
                        transition: "width 0.55s cubic-bezier(0.22,1,0.36,1), height 0.55s cubic-bezier(0.22,1,0.36,1)",
                      }
                    : { aspectRatio: `${FALLBACK_RATIO}`, maxWidth: "100%" }
                }
              >
                {ready && photos.length === 0 ? (
                  <EmptyState onPick={() => fileInputRef.current?.click()} />
                ) : !ready ? (
                  <div className="flex h-full min-h-[260px] w-full items-center justify-center">
                    <Heart className="h-8 w-8 animate-pulse text-[oklch(0.6_0.14_30)]" />
                  </div>
                ) : (
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={active?.id}
                      custom={direction}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragStart={() => setDragging(true)}
                      onDragEnd={onDragEnd}
                      initial={{ opacity: 0, x: direction > 0 ? 80 : -80, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: direction > 0 ? -80 : 80, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    >
                      {active && (
                        <>
                          <motion.img
                            src={active.url}
                            alt={active.caption || "a memory of us"}
                            className="h-full w-full object-cover"
                            initial={{ scale: 1.08 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 7, ease: "easeOut" }}
                            draggable={false}
                            onLoad={(e) => onImgLoad(active.id, e)}
                          />
                          {/* gradient veil */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.2_0.05_18/0.75)] via-transparent to-transparent" />

                          {/* top-right controls */}
                          <div className="absolute right-3 top-3 flex gap-2">
                            {active.preset && (
                              <span
                                className="flex h-9 items-center gap-1.5 rounded-full bg-[oklch(0.97_0.02_50/0.85)] px-3 text-[oklch(0.5_0.1_28)] shadow-md backdrop-blur"
                                title="A kept memory"
                              >
                                <Lock className="h-3.5 w-3.5" />
                                <span className="font-body text-xs tracking-wide">kept</span>
                              </span>
                            )}
                            {!active.preset && (
                              <button
                                onClick={() => {
                                  removePhoto(active.id);
                                  setEditingCaption(false);
                                  toast({ title: "Memory removed" });
                                }}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-[oklch(0.97_0.02_50/0.85)] text-[oklch(0.45_0.12_22)] shadow-md backdrop-blur transition hover:scale-110 hover:bg-[oklch(0.95_0.04_40)]"
                                aria-label="Remove this photo"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>

                          {/* caption */}
                          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                            {editingCaption && !active.preset ? (
                              <div className="flex items-center gap-2">
                                <input
                                  autoFocus
                                  value={draftCaption}
                                  onChange={(e) => setDraftCaption(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") saveCaption();
                                    if (e.key === "Escape") setEditingCaption(false);
                                  }}
                                  placeholder="write a little caption…"
                                  className="w-full rounded-full border border-[oklch(0.8_0.04_40/0.7)] bg-[oklch(0.99_0.01_50/0.92)] px-5 py-2.5 font-body text-base text-[oklch(0.3_0.06_20)] outline-none backdrop-blur focus:border-[oklch(0.6_0.14_30)]"
                                />
                                <button
                                  onClick={saveCaption}
                                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[oklch(0.52_0.16_18)] text-[oklch(0.98_0.02_50)] shadow-md transition hover:scale-110"
                                  aria-label="Save caption"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-end justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <Heart className="h-5 w-5 shrink-0 animate-heartbeat fill-[oklch(0.7_0.14_30)] text-[oklch(0.7_0.14_30)]" />
                                  <p className="font-script text-2xl text-[oklch(0.98_0.02_55)] drop-shadow sm:text-3xl">
                                    {active.caption || "a moment with you"}
                                  </p>
                                </div>
                                {!active.preset && (
                                  <button
                                    onClick={startEdit}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.97_0.02_50/0.7)] text-[oklch(0.98_0.02_55)] shadow-md backdrop-blur transition hover:scale-110"
                                    aria-label="Edit caption"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* arrows */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={() => paginate(-1)}
                      className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[oklch(0.99_0.01_50/0.8)] text-[oklch(0.4_0.1_22)] shadow-lg backdrop-blur transition hover:scale-110 hover:bg-[oklch(0.96_0.03_45)]"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => paginate(1)}
                      className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[oklch(0.99_0.01_50/0.8)] text-[oklch(0.4_0.1_22)] shadow-lg backdrop-blur transition hover:scale-110 hover:bg-[oklch(0.96_0.03_45)]"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* dots + count */}
            <div className="mt-4 flex items-center justify-between px-2">
              <div className="flex flex-wrap items-center gap-2">
                {photos.length > 0 &&
                  photos.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => goTo(i)}
                      aria-label={`Go to memory ${i + 1}`}
                      className="h-2.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === safeIndex ? 26 : 10,
                        background:
                          i === safeIndex
                            ? "oklch(0.55 0.16 18)"
                            : "oklch(0.8 0.05 40)",
                      }}
                    />
                  ))}
              </div>
              <span className="font-body text-sm text-[oklch(0.5_0.08_30)]">
                {photos.length > 0 ? `${safeIndex + 1} / ${photos.length}` : ""}
              </span>
            </div>
          </div>
        </Reveal>

        {/* add button */}
        <Reveal delay={0.2} className="mt-8 flex justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[oklch(0.55_0.16_18)] to-[oklch(0.5_0.15_28)] px-7 py-3.5 font-body text-lg text-[oklch(0.98_0.02_50)] shadow-[0_14px_30px_-12px_oklch(0.45_0.16_18/0.7)] transition hover:scale-[1.03] hover:shadow-[0_18px_40px_-12px_oklch(0.45_0.16_18/0.8)]"
          >
            <ImagePlus className="h-5 w-5 transition group-hover:rotate-6" />
            Add our photos
          </button>
        </Reveal>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
    </section>
  );
}

function EmptyState({ onPick }: { onPick: () => void }) {
  return (
    <button
      onClick={onPick}
      className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center transition hover:bg-[oklch(0.95_0.03_45)]"
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[oklch(0.96_0.04_45)] text-[oklch(0.55_0.15_22)] animate-sway">
        <Camera className="h-9 w-9" />
      </span>
      <span className="font-script text-3xl text-[oklch(0.45_0.12_22)]">
        let&apos;s fill this with us
      </span>
      <span className="max-w-sm font-body text-base text-[oklch(0.45_0.08_28)]">
        Tap here to choose photos from your device. Every picture you add becomes
        a little piece of our story.
      </span>
    </button>
  );
}
