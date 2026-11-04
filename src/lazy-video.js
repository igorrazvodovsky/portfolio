/* Deferred playback for the feed's screen recordings.
 *
 * An `autoplay` video is fetched on page load whatever `preload` says, so the
 * home page shipped several megabytes before the reader reached the first
 * figure. The markup now carries `preload="none"` and `controls`, with no
 * `autoplay`: without this script the poster sits still and the browser's own
 * controls play it. With it, the controls are taken away and the video starts
 * (muted, looping) once its figure comes within a screen of the viewport, and
 * pauses again when it leaves — the same experience as autoplay, paid for on
 * scroll rather than on load.
 *
 * A video marked `data-once` is a scene that plays through and holds its last
 * frame, which is also its poster. Started a screen early it would be over
 * before anyone saw it, so it only starts loading a screen ahead, and starts
 * playing once it is mostly in view. It does not loop, and once it has ended
 * it is left alone on that frame. Under `prefers-reduced-motion` it does not
 * play at all: the poster already shows the end state.
 *
 * A `<source>` may carry `data-poster`, the poster for the version it serves.
 * The `poster` attribute can't vary with `media`, so the poster of the first
 * source whose media query matches replaces it. Vite only rewrites the asset
 * attributes it knows, so these paths are resolved through the glob below.
 */

const SELECTOR = "video[data-autoplay]";
const MOSTLY = 0.6;

const posters = import.meta.glob("/src/images/**/*-poster.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

function matchPoster(video) {
  for (const source of video.querySelectorAll("source")) {
    if (source.media && !matchMedia(source.media).matches) continue;
    const { poster } = source.dataset;
    if (poster) video.poster = posters[poster] ?? poster;
    return;
  }
}

/* A figure taller than the viewport never reaches a high ratio, so it also
   counts as mostly in view when it fills most of the viewport. */
function isMostlyInView({ intersectionRatio, intersectionRect, rootBounds }) {
  return (
    intersectionRatio >= MOSTLY ||
    (rootBounds && intersectionRect.height >= rootBounds.height * MOSTLY)
  );
}

export function initLazyVideos() {
  const videos = document.querySelectorAll(SELECTOR);
  if (!videos.length) return;

  const looping = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) {
          target.play().catch(() => {});
        } else {
          target.pause();
        }
      }
    },
    { rootMargin: "100% 0px" },
  );

  // Fetches a play-once video a screen ahead, so it is ready when it plays.
  const nearby = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        target.preload = "auto";
        nearby.unobserve(target);
      }
    },
    { rootMargin: "100% 0px" },
  );

  const once = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const { target } = entry;
        if (target.ended) continue;
        if (isMostlyInView(entry)) {
          target.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          target.pause();
        }
      }
    },
    { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
  );

  for (const video of videos) {
    video.removeAttribute("controls");
    video.muted = true;
    matchPoster(video);

    if (!("once" in video.dataset)) {
      looping.observe(video);
      continue;
    }

    video.loop = false;
    video.addEventListener("ended", () => once.unobserve(video), { once: true });
    if (reducedMotion.matches) continue;
    nearby.observe(video);
    once.observe(video);
  }
}
