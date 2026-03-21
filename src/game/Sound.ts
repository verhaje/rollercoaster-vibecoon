import { type SimExports } from './types';
import { type Renderer } from '../render/Renderer';
import ATTRACTIONS from './config/attractions';
import { ECONOMY } from './config/economy';

type AmbientVoice = {
  oscA: OscillatorNode;
  oscB: OscillatorNode;
  gain: GainNode;
};

type AttractionProfile = {
  waveA: OscillatorType;
  waveB: OscillatorType;
  baseA: number;
  baseB: number;
  tremoloHz: number;
};

const MASTER_VOLUME = 0.2;
const MAX_AMBIENT_VOICES = 8;

export class SoundSystem {
  private readonly context: AudioContext | null;
  private readonly master: GainNode | null;

  private ambienceAccumulatorMs = 0;
  private ambienceVoices = new Map<number, AmbientVoice>();
  private lastPayAt = new Map<number, number>();
  private lastCheerAt = new Map<number, number>();

  constructor() {
    const AudioCtor = globalThis.AudioContext || (globalThis as typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) {
      this.context = null;
      this.master = null;
      return;
    }

    this.context = new AudioCtor();
    this.master = this.context.createGain();
    this.master.gain.value = MASTER_VOLUME;
    this.master.connect(this.context.destination);
  }

  update(sim: SimExports, renderer: Renderer, dtMs: number, paused: boolean): void {
    if (!this.context || !this.master) return;
    this.resumeIfNeeded();

    if (paused) {
      this.fadeOutAllVoices(0.08);
      return;
    }

    this.ambienceAccumulatorMs += dtMs;
    if (this.ambienceAccumulatorMs < 120) return;
    this.ambienceAccumulatorMs = 0;

    const audible = this.collectAudibleAttractions(sim, renderer)
      .filter((item) => item.audibility > 0.02 && sim.getInstRiders(item.instanceId) > 0)
      .sort((a, b) => b.audibility - a.audibility)
      .slice(0, MAX_AMBIENT_VOICES);

    const keepIds = new Set<number>(audible.map((a) => a.instanceId));

    for (const [instanceId, voice] of this.ambienceVoices) {
      if (!keepIds.has(instanceId)) {
        this.stopVoice(instanceId, voice, 0.12);
      }
    }

    const now = this.context.currentTime;
    for (const item of audible) {
      const targetGain = 0.17 * item.audibility;
      const voice = this.ensureVoice(sim, item.instanceId);
      if (!voice) continue;
      voice.gain.gain.cancelScheduledValues(now);
      voice.gain.gain.linearRampToValueAtTime(targetGain, now + 0.12);
    }
  }

  playPay(instanceId: number, sim: SimExports, renderer: Renderer): void {
    const ctx = this.context;
    const master = this.master;
    if (!ctx || !master) return;

    const nowMs = performance.now();
    const last = this.lastPayAt.get(instanceId) ?? -1000;
    if (nowMs - last < 120) return;

    const audibility = this.getInstanceAudibility(sim, renderer, instanceId);
    if (audibility <= 0) return;

    this.lastPayAt.set(instanceId, nowMs);
    this.resumeIfNeeded();

    const t = ctx.currentTime;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.11 * audibility, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    g.connect(master);

    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(740, t);
    osc1.frequency.linearRampToValueAtTime(980, t + 0.07);
    osc1.connect(g);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1120, t + 0.04);
    osc2.connect(g);

    osc1.start(t);
    osc1.stop(t + 0.19);
    osc2.start(t + 0.03);
    osc2.stop(t + 0.19);

    setTimeout(() => {
      g.disconnect();
    }, 230);
  }

  playCheer(instanceId: number, sim: SimExports, renderer: Renderer): void {
    const ctx = this.context;
    const master = this.master;
    if (!ctx || !master) return;

    const nowMs = performance.now();
    const last = this.lastCheerAt.get(instanceId) ?? -1000;
    if (nowMs - last < 300) return;

    const audibility = this.getInstanceAudibility(sim, renderer, instanceId);
    if (audibility <= 0) return;

    this.lastCheerAt.set(instanceId, nowMs);
    this.resumeIfNeeded();

    const t = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.09 * audibility, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    gain.connect(master);

    const freqs = [330, 392, 494];
    for (let i = 0; i < freqs.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freqs[i], t + i * 0.015);
      osc.detune.setValueAtTime((Math.random() - 0.5) * 20, t + i * 0.015);
      osc.connect(gain);
      osc.start(t + i * 0.015);
      osc.stop(t + 0.28 + i * 0.02);
    }
  }

  private ensureVoice(sim: SimExports, instanceId: number): AmbientVoice | null {
    const existing = this.ambienceVoices.get(instanceId);
    if (existing) return existing;

    const ctx = this.context;
    const master = this.master;
    if (!ctx || !master) return null;

    const profile = this.profileForInstance(sim, instanceId);
    const voiceGain = ctx.createGain();
    voiceGain.gain.value = 0;
    voiceGain.connect(master);

    const oscA = ctx.createOscillator();
    oscA.type = profile.waveA;
    oscA.frequency.value = profile.baseA;

    const oscB = ctx.createOscillator();
    oscB.type = profile.waveB;
    oscB.frequency.value = profile.baseB;

    const tremolo = ctx.createOscillator();
    tremolo.type = 'sine';
    tremolo.frequency.value = profile.tremoloHz;
    const tremoloDepth = ctx.createGain();
    tremoloDepth.gain.value = 5;

    tremolo.connect(tremoloDepth);
    tremoloDepth.connect(oscA.frequency);

    oscA.connect(voiceGain);
    oscB.connect(voiceGain);

    tremolo.start();
    oscA.start();
    oscB.start();

    const voice: AmbientVoice = { oscA, oscB, gain: voiceGain };
    this.ambienceVoices.set(instanceId, voice);
    return voice;
  }

  private stopVoice(instanceId: number, voice: AmbientVoice, fadeSec: number): void {
    const ctx = this.context;
    if (!ctx) return;

    const t = ctx.currentTime;
    voice.gain.gain.cancelScheduledValues(t);
    voice.gain.gain.linearRampToValueAtTime(0, t + fadeSec);

    setTimeout(() => {
      try {
        voice.oscA.stop();
        voice.oscB.stop();
      } catch {
        // no-op if already stopped
      }
      voice.oscA.disconnect();
      voice.oscB.disconnect();
      voice.gain.disconnect();
      this.ambienceVoices.delete(instanceId);
    }, Math.ceil(fadeSec * 1000) + 10);
  }

  private fadeOutAllVoices(fadeSec: number): void {
    for (const [instanceId, voice] of this.ambienceVoices) {
      this.stopVoice(instanceId, voice, fadeSec);
    }
  }

  private resumeIfNeeded(): void {
    if (!this.context) return;
    if (this.context.state === 'suspended') {
      void this.context.resume();
    }
  }

  private profileForInstance(sim: SimExports, instanceId: number): AttractionProfile {
    const templateId = sim.getInstTemplateId(instanceId);
    const def = ATTRACTIONS.find((a) => a.id === templateId);

    if (templateId === 0) {
      // Carousel-like music box pulse.
      return { waveA: 'triangle', waveB: 'sine', baseA: 523.25, baseB: 659.25, tremoloHz: 1.1 };
    }

    if (def?.category === 'thrill') {
      return { waveA: 'sawtooth', waveB: 'triangle', baseA: 140, baseB: 220, tremoloHz: 2.2 };
    }
    if (def?.category === 'relax') {
      return { waveA: 'sine', waveB: 'triangle', baseA: 220, baseB: 293.66, tremoloHz: 0.6 };
    }
    if (def?.category === 'food' || def?.category === 'drink') {
      return { waveA: 'square', waveB: 'sine', baseA: 330, baseB: 392, tremoloHz: 1.6 };
    }

    return { waveA: 'triangle', waveB: 'sine', baseA: 261.63, baseB: 392, tremoloHz: 1.2 };
  }

  private collectAudibleAttractions(sim: SimExports, renderer: Renderer): Array<{ instanceId: number; audibility: number }> {
    const out: Array<{ instanceId: number; audibility: number }> = [];
    const count = sim.getInstanceCount();
    for (let i = 0; i < count; i++) {
      if (sim.isInstActive(i) !== 1) continue;
      const audibility = this.getInstanceAudibility(sim, renderer, i);
      if (audibility > 0) {
        out.push({ instanceId: i, audibility });
      }
    }
    return out;
  }

  private getInstanceAudibility(sim: SimExports, renderer: Renderer, instanceId: number): number {
    const cam = renderer.camera;
    const zoom = cam.zoom;
    const halfW = renderer.app.screen.width / (2 * zoom);
    const halfH = renderer.app.screen.height / (2 * zoom);

    const instanceCenter = this.getInstanceWorldCenter(sim, instanceId);

    const visible =
      instanceCenter.x >= cam.x - halfW &&
      instanceCenter.x <= cam.x + halfW &&
      instanceCenter.y >= cam.y - halfH &&
      instanceCenter.y <= cam.y + halfH;

    if (!visible) return 0;

    const dx = instanceCenter.x - cam.x;
    const dy = instanceCenter.y - cam.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.sqrt(halfW * halfW + halfH * halfH);
    const distGain = maxDist > 0 ? Math.max(0, 1 - dist / maxDist) : 0;
    const zoomGain = Math.max(0, Math.min(1, (zoom - 0.8) / 2.5));

    return distGain * zoomGain;
  }

  private getInstanceWorldCenter(sim: SimExports, instanceId: number): { x: number; y: number } {
    const ix = sim.getInstX(instanceId);
    const iy = sim.getInstY(instanceId);
    const tid = sim.getInstTemplateId(instanceId);
    const fw = Math.max(1, sim.getTmplFootprintW(tid));
    const fh = Math.max(1, sim.getTmplFootprintH(tid));

    return {
      x: (ix + fw * 0.5) * ECONOMY.tileSize,
      y: (iy + fh * 0.5) * ECONOMY.tileSize,
    };
  }
}
