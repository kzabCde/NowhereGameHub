const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function getStorageItem(key, fallback = null) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setStorageItem(key, value) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function getStringStorage(key, fallback = '') {
  const value = getStorageItem(key, fallback);
  return typeof value === 'string' ? value : fallback;
}

export function setStringStorage(key, value) { setStorageItem(key, String(value)); }
export function getNumberStorage(key, fallback = 0) {
  const value = getStorageItem(key, fallback);
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}
export function setNumberStorage(key, value) { setStorageItem(key, Number(value)); }
export function getArrayStorage(key) {
  const value = getStorageItem(key, []);
  return Array.isArray(value) ? value : [];
}
export function setArrayStorage(key, value) { setStorageItem(key, Array.isArray(value) ? value : []); }
