import { useCallback, useRef } from 'react';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = true;

  private getCtx(): AudioContext {
    if (!this.ctx) this.ctx = new AudioContext();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  playCorrect() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const now = ctx.currentTime;

    // Happy ascending chime
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.3, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.4);
    });
  }

  playIncorrect() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const now = ctx.currentTime;

    // Gentle buzzer
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.3);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playDrop() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const now = ctx.currentTime;

    // Soft plop
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playLevelComplete() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const now = ctx.currentTime;

    // Triumphant fanfare
    [392, 523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.25, now + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.5);
    });
  }

  playPickup() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }
}

export function useSoundEffects() {
  const engineRef = useRef(new SoundEngine());
  const engine = engineRef.current;

  return {
    playCorrect: useCallback(() => engine.playCorrect(), [engine]),
    playIncorrect: useCallback(() => engine.playIncorrect(), [engine]),
    playDrop: useCallback(() => engine.playDrop(), [engine]),
    playLevelComplete: useCallback(() => engine.playLevelComplete(), [engine]),
    playPickup: useCallback(() => engine.playPickup(), [engine]),
    toggle: useCallback(() => engine.toggle(), [engine]),
    isEnabled: useCallback(() => engine.isEnabled(), [engine]),
  };
}
