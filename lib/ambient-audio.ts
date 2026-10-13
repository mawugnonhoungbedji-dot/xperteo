// Original instrumental loops: warm keys, a light melody and a gentle pulse.
// Composed locally with Web Audio; no remote media or downloads.
export const DEFAULT_MUSIC_VOLUME = 40;
export const ambiences = [
  { name: "Cocon", description: "Clavier chaleureux, mélodie douce et pulsation légère", chords: [[48, 55, 60, 64, 67], [45, 52, 60, 64, 67], [41, 48, 57, 60, 64], [43, 50, 59, 62, 67]], bpm: 84 },
  { name: "Clarté", description: "Notes lumineuses et rythme souple", chords: [[50, 57, 62, 66, 69], [47, 54, 62, 66, 69], [43, 50, 59, 62, 66], [45, 52, 61, 64, 69]], bpm: 96 },
  { name: "Horizon", description: "Accords amples et mélodie posée", chords: [[41, 48, 53, 57, 60], [38, 45, 53, 57, 60], [46, 53, 58, 62, 65], [48, 55, 60, 64, 67]], bpm: 76 },
] as const;

export class AmbientAudio {
  private context = new AudioContext();
  private master = this.context.createGain();
  private timer: ReturnType<typeof setInterval> | undefined;
  private next = 0;
  private chord = 0;
  private selected = 0;
  private voices = new Map<OscillatorNode, GainNode>();
  private volume = DEFAULT_MUSIC_VOLUME / 100;
  private playbackRequest = 0;

  constructor() {
    const filter = this.context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 3200;
    // A quiet echo gives the keys some space without a distracting long tail.
    const echo = this.context.createDelay(1);
    const feedback = this.context.createGain();
    const wet = this.context.createGain();
    echo.delayTime.value = 0.32;
    feedback.gain.value = 0.18;
    wet.gain.value = 0.16;
    this.master.gain.value = 0;
    this.master.connect(filter);
    filter.connect(this.context.destination);
    filter.connect(echo);
    echo.connect(feedback);
    feedback.connect(echo);
    echo.connect(wet);
    wet.connect(this.context.destination);
    this.context.onstatechange = () => {
      if (this.context.state !== "running" && this.timer) {
        clearInterval(this.timer);
        this.timer = undefined;
      }
    };
  }

  private note(midi: number, start: number, duration: number, level: number, instrument: "pad" | "key" | "bass" = "pad") {
    const context = this.context;
    const voice = context.createOscillator();
    const envelope = context.createGain();
    voice.type = instrument === "key" ? "triangle" : "sine";
    voice.frequency.value = 440 * 2 ** ((midi - 69) / 12);
    envelope.gain.setValueAtTime(0, start);
    const attack = instrument === "pad" ? 0.7 : instrument === "bass" ? 0.025 : 0.012;
    envelope.gain.linearRampToValueAtTime(level, start + attack);
    if (instrument === "key") {
      envelope.gain.exponentialRampToValueAtTime(level * 0.3, start + 0.25);
    }
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    voice.connect(envelope);
    envelope.connect(this.master);
    this.voices.set(voice, envelope);
    voice.onended = () => { this.voices.delete(voice); voice.disconnect(); envelope.disconnect(); };
    voice.start(start);
    voice.stop(start + duration + 0.1);
  }

  private schedule = () => {
    const preset = ambiences[this.selected];
    const beat = 60 / preset.bpm;
    const phrase = beat * 8;
    // Background tabs can throttle timers: resume from now rather than replaying missed chords.
    if (this.next < this.context.currentTime) this.next = this.context.currentTime + 0.05;
    while (this.next < this.context.currentTime + 20) {
      const notes = preset.chords[this.chord % preset.chords.length];
      // Two bars per chord: sustained harmony beneath a sparse repeating motif.
      notes.forEach((note, index) => {
        this.note(note, this.next + index * 0.04, phrase + 0.6, 0.045);
      });
      for (let pulse = 0; pulse < 8; pulse += 2) {
        this.note(notes[0] - 12, this.next + pulse * beat, beat * 1.4, 0.16, "bass");
        const voicing = [notes[2], notes[3], notes[4]];
        voicing.forEach((note, index) => {
          this.note(note, this.next + (pulse + 0.5) * beat + index * 0.018, beat * 1.8, 0.075, "key");
        });
      }
      const motif = this.chord % 2 === 0 ? [2, 3, 4, 3, 2] : [3, 2, 4, 3, 2];
      const positions = [0, 1.5, 3, 5, 6.5];
      motif.forEach((degree, index) => {
        this.note(notes[degree] + 12, this.next + positions[index] * beat, beat * 1.9, 0.22, "key");
      });
      this.next += phrase;
      this.chord++;
    }
  };

  async play() {
    const request = ++this.playbackRequest;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      // Some embedded browsers leave resume() pending indefinitely when blocked.
      // Never leave the visitor's manual control disabled in that case.
      await Promise.race([
        this.context.resume(),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => reject(new Error("Audio activation blocked")), 2000);
        }),
      ]);
    } catch (error) {
      if (request !== this.playbackRequest) return false;
      throw error;
    } finally {
      if (timeout) clearTimeout(timeout);
    }
    // A delayed autoplay request must never undo a visitor's pause.
    if (request !== this.playbackRequest) return false;
    if (this.context.state !== "running") throw new Error("Audio unavailable");
    if (!this.voices.size) this.next = this.context.currentTime + 0.05;
    this.schedule();
    if (!this.timer) this.timer = setInterval(this.schedule, 4000);
    this.setVolume(this.volume);
    return true;
  }

  async pause() {
    this.playbackRequest++;
    if (this.timer) clearInterval(this.timer);
    this.timer = undefined;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(0, now, 0.04);
    await new Promise(resolve => setTimeout(resolve, 220));
    await this.context.suspend();
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(this.volume, now, 0.15);
  }

  select(index: number) {
    if (!ambiences[index] || this.selected === index) return;
    this.selected = index;
    const now = this.context.currentTime;
    this.voices.forEach((envelope, voice) => {
      envelope.gain.cancelScheduledValues(now);
      envelope.gain.setTargetAtTime(0, now, 0.2);
      voice.stop(now + 1);
    });
    this.voices.clear();
    this.chord = 0;
    this.next = this.context.currentTime + 0.05;
    if (this.context.state === "running") this.schedule();
  }

  dispose() {
    this.playbackRequest++;
    if (this.timer) clearInterval(this.timer);
    this.context.onstatechange = null;
    void this.context.close().catch(() => {});
  }
}
