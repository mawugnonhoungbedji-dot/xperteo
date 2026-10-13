"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, Pause, Play, SlidersHorizontal, Volume2, X } from "lucide-react";
import { ambiences, AmbientAudio, DEFAULT_MUSIC_VOLUME } from "@/lib/ambient-audio";
import "./ambient-player.css";

export function AmbientPlayer() {
  const engine = useRef<AmbientAudio | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const settings = useRef<HTMLButtonElement>(null);
  const stopAutomaticStart = useRef<(() => void) | null>(null);
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [volume, setVolume] = useState(DEFAULT_MUSIC_VOLUME);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let audio: AmbientAudio;
    try {
      audio = new AmbientAudio();
      engine.current = audio;
    } catch {
      // Keep the manual control available if audio initialization fails.
      return;
    }

    const detach = () => {
      cancelled = true;
      document.removeEventListener("pointerup", onInteraction);
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("touchend", onInteraction);
      document.removeEventListener("keydown", onInteraction);
    };
    const start = () => {
      if (cancelled) return;
      // resume() may stay pending until a browser receives a user gesture.
      // Keep the pause/play control responsive during that wait.
      void audio.play().then(started => {
        if (!cancelled && started) {
          setPlaying(true);
          detach();
        }
      }).catch(() => {
        // A blocked automatic attempt is expected; retry on interaction.
      });
    };
    function onInteraction(event: Event) {
      if (!event.isTrusted) return;
      // Let the explicit pause/play button handle its own request.
      if (event.target instanceof Element && event.target.closest(".ambient-toggle")) return;
      if (event instanceof KeyboardEvent && (event.repeat || event.ctrlKey || event.metaKey || event.altKey)) return;
      start();
    }

    stopAutomaticStart.current = detach;
    document.addEventListener("pointerup", onInteraction);
    document.addEventListener("click", onInteraction);
    document.addEventListener("touchend", onInteraction, { passive: true });
    document.addEventListener("keydown", onInteraction);
    start();
    return () => {
      detach();
      audio.dispose();
      if (engine.current === audio) engine.current = null;
      stopAutomaticStart.current = null;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); settings.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  async function toggle() {
    if (busy) return;
    stopAutomaticStart.current?.();
    setBusy(true);
    setError("");
    try {
      if (playing) {
        await engine.current?.pause();
        setPlaying(false);
      } else {
        if (!engine.current) engine.current = new AmbientAudio();
        engine.current.select(selected);
        engine.current.setVolume(volume / 100);
        if (await engine.current.play()) setPlaying(true);
      }
    } catch {
      engine.current?.dispose();
      engine.current = null;
      setPlaying(false);
      setError("Le navigateur n’a pas autorisé le son. Réessayez avec le bouton de lecture.");
      setOpen(true);
    } finally { setBusy(false); }
  }

  return (
    <div className="ambient-player" ref={container}>
      {open && (
        <section className="ambient-panel" id="ambient-settings" aria-label="Réglages de l’ambiance sonore">
          <div className="ambient-heading">
            <span><Headphones size={18} aria-hidden="true" /> Un moment pour vous</span>
            <button type="button" onClick={() => { setOpen(false); settings.current?.focus(); }} aria-label="Fermer les réglages"><X size={18} aria-hidden="true" /></button>
          </div>
          <p>Une ambiance douce pour accompagner votre découverte.</p>
          <div className="ambient-choices" role="group" aria-label="Choisir une ambiance">
            {ambiences.map((ambience, index) => (
              <button key={ambience.name} type="button" aria-pressed={selected === index} disabled={busy} onClick={() => {
                setSelected(index);
                engine.current?.select(index);
              }}>
                <strong>{ambience.name}</strong><span>{ambience.description}</span>
              </button>
            ))}
          </div>
          <label className="ambient-volume" htmlFor="ambient-volume"><Volume2 size={18} aria-hidden="true" /> Volume <span>{volume} %</span></label>
          <input id="ambient-volume" type="range" min="0" max="100" value={volume} aria-valuetext={`${volume} pour cent`} onChange={event => {
            const value = Number(event.target.value);
            setVolume(value);
            engine.current?.setVolume(value / 100);
          }} />
          <p className="ambient-note">Sans paroles. À votre rythme.</p>
        </section>
      )}
      <p role="status" className={error ? "ambient-error" : "ambient-sr-only"}>{error || (playing ? `Ambiance ${ambiences[selected].name} en lecture` : "Ambiance sonore en pause")}</p>
      <div className="ambient-dock">
        <button type="button" className="ambient-toggle" disabled={busy} onClick={toggle} aria-label={playing ? "Mettre l’ambiance sonore en pause" : "Lancer l’ambiance sonore"} aria-pressed={playing}>
          {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
          <span>{playing ? ambiences[selected].name : "Ambiance"}</span>
        </button>
        <button type="button" ref={settings} className="ambient-settings" onClick={() => setOpen(!open)} aria-label="Réglages de l’ambiance sonore" aria-expanded={open} aria-controls="ambient-settings"><SlidersHorizontal size={18} aria-hidden="true" /></button>
      </div>
    </div>
  );
}
