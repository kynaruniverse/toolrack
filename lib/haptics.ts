// Best-effort tactile feedback via the Web Vibration API. Android Chrome
// supports this; iOS Safari has never implemented it, so this silently
// does nothing there — a progressive enhancement, never a requirement.
export function hapticTap() {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(10);
  }
}