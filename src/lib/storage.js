export const isBrowser = () => typeof window !== 'undefined';
export const getStorage = (key, fallback) => {
  if (!isBrowser()) return fallback;
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
};
export const setStorage = (key, value) => { if (isBrowser()) localStorage.setItem(key, JSON.stringify(value)); };
