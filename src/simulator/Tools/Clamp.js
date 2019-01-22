/**
 * Returns number, but clamped to the given min and max.
 */
export default function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}
