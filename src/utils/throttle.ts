export function throttle(fn: (...args: any[]) => any, delay = 300) {
  let prev = Date.now();
  const that = this;
  return function (...inner: any[]) {
    const now = Date.now();
    const diff = now - prev;
    if (diff > delay) {
      fn.apply(that, inner);
      prev = now;
    } else {
      prev = now;
    }
  };
}
