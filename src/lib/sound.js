import { getStorage } from './storage';
export const isSoundEnabled = () => getStorage('gameHubSound', true);
export const playClick = () => {
  if (typeof window === 'undefined' || !isSoundEnabled()) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine'; osc.frequency.value = 660; gain.gain.value = 0.04;
  osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.06);
};
