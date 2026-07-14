/*
  TEMPORARY debug helper (NOT used in production).
  Kept for traceability while we identify the real blocking API.
*/

export function mark(label: string) {
  if (typeof performance !== 'undefined' && performance.now) {
    console.log(`[homepage-debug] ${label}`, performance.now());
  } else {
    console.log(`[homepage-debug] ${label}`);
  }
}