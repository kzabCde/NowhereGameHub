import { getStringStorage } from './storage';
const SOUND_KEY = 'nowhereGameHubSound';
const canPlay = () => typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext) && getStringStorage(SOUND_KEY, 'on') === 'on';
function beep(freq=440,duration=0.08,type='sine',vol=0.02){
  if (!canPlay()) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = type; osc.frequency.value = freq; gain.gain.value = vol;
    osc.connect(gain); gain.connect(ctx.destination); osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}
export const playClickSound = () => beep(620,0.04,'triangle');
export const playMoveSound = () => beep(480,0.06,'square');
export const playWinSound = () => { beep(660,0.06); setTimeout(()=>beep(880,0.1),60); };
export const playLoseSound = () => beep(200,0.14,'sawtooth');
