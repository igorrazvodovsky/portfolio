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
 */

const SELECTOR = "video[data-autoplay]";

export function initLazyVideos() {
  const videos = document.querySelectorAll(SELECTOR);
  if (!videos.length) return;

  const observer = new IntersectionObserver(
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

  for (const video of videos) {
    video.removeAttribute("controls");
    video.muted = true;
    observer.observe(video);
  }
}
