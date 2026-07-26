/**
 * Hardcoded memories that ship with the website.
 *
 * These always show up for anyone who visits — even before they add their own
 * photos. Perfect for pre-loading a few of your favourite pictures of you and
 * Mau when you deploy this site.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * HOW TO ADD YOUR PHOTOS
 * ───────────────────────────────────────────────────────────────────────────
 *   1. Copy your photo into the folder:   public/memories/
 *      (create the "memories" folder inside "public" if it isn't there yet)
 *
 *   2. Add an entry below, like:
 *        { src: "/memories/our-first-date.jpg", caption: "the beginning of us" },
 *
 * The path must start with "/memories/" and point to a file you placed there.
 * Supported formats: .jpg, .jpeg, .png, .webp, .gif, .avif
 *
 * Tip: Photos can be any orientation — landscape or portrait — the carousel
 * adapts its shape to each picture automatically.
 */
export type DefaultMemory = {
  /** Path to the image, e.g. "/memories/our-photo.jpg" */
  src: string;
  /** A little caption shown under the photo (optional) */
  caption: string;
};

export const defaultMemories: DefaultMemory[] = [
  // { src: "/memories/example.jpg", caption: "a moment with you" },
];
