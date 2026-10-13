import type { NarratedSection } from "./home-narration";

export type NarrationState = { title: string; reading: boolean; error?: string };

export class SectionNarrator {
  private visited = new Set<string>();
  private current: NarratedSection | null = null;
  private paused = false;
  private generation = 0;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor(
    private speech: SpeechSynthesis,
    private onState: (state: NarrationState) => void,
    private createUtterance = (text: string) => new SpeechSynthesisUtterance(text),
  ) {}

  read(section: NarratedSection, force = false) {
    if (!force && this.visited.has(section.id)) {
      if (this.current?.id !== section.id) this.silence();
      return;
    }
    const generation = ++this.generation;
    this.speech.cancel();
    this.paused = false;
    this.current = section;
    this.visited.add(section.id);
    const utterance = this.createUtterance(section.text);
    this.utterance = utterance; // Retain it until completion (some browsers require this).
    utterance.lang = "fr-FR";
    utterance.rate = 0.94;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    const frenchVoices = this.speech.getVoices().filter(voice => voice.lang.toLowerCase().startsWith("fr"));
    utterance.voice = frenchVoices.find(voice => voice.lang.toLowerCase() === "fr-fr") ?? frenchVoices[0] ?? null;
    utterance.onend = () => {
      if (generation !== this.generation) return;
      this.utterance = null;
      this.onState({ title: section.title, reading: false });
    };
    utterance.onerror = event => {
      if (generation !== this.generation || event.error === "interrupted" || event.error === "canceled") return;
      this.visited.delete(section.id);
      this.utterance = null;
      this.onState({ title: section.title, reading: false, error: "La voix n’a pas pu démarrer. Réessayez en cliquant sur Écouter la visite." });
    };
    this.onState({ title: section.title, reading: true });
    this.speech.speak(utterance);
  }

  pause() {
    this.paused = true;
    this.speech.pause();
    this.onState({ title: this.current?.title ?? "", reading: false });
  }

  silence() {
    this.generation++;
    this.speech.cancel();
    this.current = null;
    this.utterance = null;
    this.paused = false;
    this.onState({ title: "", reading: false });
  }

  resume(section: NarratedSection) {
    if (this.paused && this.current?.id === section.id && this.utterance) {
      this.paused = false;
      this.speech.resume();
      this.onState({ title: section.title, reading: true });
    } else this.read(section, true);
  }

  dispose() {
    this.generation++;
    this.speech.cancel();
    this.utterance = null;
  }
}
