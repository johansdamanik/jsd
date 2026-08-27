/**
 * Pip-Boy 3000 Web Audio Synthesis Engine
 * Synthesizes retro CRT terminal beeps, mechanical clicks, geiger crackles,
 * and vintage 50s Fallout-style radio arpeggios without external audio dependencies.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let activeRadioOscillators: { stop: () => void }[] = [];
let radioInterval: any = null;

export function initAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioMuted(): boolean {
  return !soundEnabled;
}

export function toggleAudioMute(): boolean {
  soundEnabled = !soundEnabled;
  if (!soundEnabled) {
    stopRadioPlayback();
  }
  return soundEnabled;
}

export function setAudioMute(muted: boolean) {
  soundEnabled = !muted;
  if (!soundEnabled) {
    stopRadioPlayback();
  }
}

/**
 * High-tech Pip-Boy mechanical UI click
 */
export function playPipboyClick(frequency: number = 880, duration: number = 0.04) {
  if (!soundEnabled) return;
  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.4, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
}

/**
 * Pip-Boy top tab switch sound (satisfying dual tone)
 */
export function playTabSound() {
  if (!soundEnabled) return;
  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.setValueAtTime(1600, now + 0.03);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
}

/**
 * Typewriter key click / teletype sound for boot sequence
 */
export function playTypewriterClick() {
  if (!soundEnabled) return;
  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Randomize pitch slightly for authentic vintage feel
    const pitch = 600 + Math.random() * 200;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  } catch (e) {}
}

/**
 * Geiger counter random crackle
 */
export function playGeigerClick() {
  if (!soundEnabled) return;
  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150 + Math.random() * 300, now);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.008);
  } catch (e) {}
}

/**
 * Vault-Tec Quest Complete / Perk Fanfare
 */
export function playFanfare() {
  if (!soundEnabled) return;
  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // A major chord fanfare

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.09);

      gain.gain.setValueAtTime(0, now + index * 0.09);
      gain.gain.linearRampToValueAtTime(0.07, now + index * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.09);
      osc.stop(now + index * 0.09 + 0.35);
    });
  } catch (e) {}
}

/**
 * Start procedural Fallout Radio synthesizer
 */
export function startRadioPlayback(stationId: string = 'galaxy-news') {
  stopRadioPlayback();
  if (!soundEnabled) return;

  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    let melodyIndex = 0;
    // Classic 50s I - vi - IV - V progression (C major - A minor - F major - G major)
    const jazzNotes = [
      261.63, 329.63, 392.00, 523.25, // C - E - G - C
      220.00, 261.63, 329.63, 440.00, // A - C - E - A
      174.61, 220.00, 261.63, 349.23, // F - A - C - F
      196.00, 246.94, 293.66, 392.00  // G - B - D - G
    ];

    const lofiNotes = [
      130.81, 196.00, 246.94, 293.66, 392.00,
      110.00, 164.81, 220.00, 261.63, 329.63,
      87.31, 130.81, 174.61, 220.00, 261.63,
      98.00, 146.83, 196.00, 246.94, 293.66
    ];

    const notesToPlay = stationId === 'diamond-city' ? lofiNotes : jazzNotes;
    const intervalMs = stationId === 'diamond-city' ? 450 : 280;

    radioInterval = setInterval(() => {
      if (!soundEnabled || !audioCtx) return;
      const now = audioCtx.currentTime;
      const freq = notesToPlay[melodyIndex % notesToPlay.length];
      melodyIndex++;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = stationId === 'diamond-city' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (intervalMs / 1000) * 1.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + (intervalMs / 1000) * 1.5);
    }, intervalMs);
  } catch (e) {}
}

export function stopRadioPlayback() {
  if (radioInterval) {
    clearInterval(radioInterval);
    radioInterval = null;
  }
}
