export function test(fn: () => any, times: number = 1): number {
  const s = performance.now();
  times = times >>> 0;
  while (times--) { fn(); }
  const cost = performance.now() - s;
  return cost;
}
