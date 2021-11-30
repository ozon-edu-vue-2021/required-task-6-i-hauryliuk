export function debounce(fn, delay) {
  let lastTimer = null;
  return function (...args) {
    if (lastTimer) {
      clearTimeout(lastTimer);
    }
    lastTimer = setTimeout(() => fn(...args), delay);
  };
}
