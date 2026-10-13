"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, Pause, Play, RotateCcw } from "lucide-react";
import { homeNarration, mostVisibleSection } from "@/lib/home-narration";
import { SectionNarrator, type NarrationState } from "@/lib/section-narrator";
import "./section-narrator.css";

export function HomeNarrator() {
  const narrator = useRef<SectionNarrator | null>(null);
  const active = useRef(false);
  const current = useRef(-1);
  const delayed = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<NarrationState>({ title: "", reading: false });

  useEffect(() => {
    const elements = homeNarration.map(section => document.querySelector(section.selector));
    let frame = 0;
    const update = () => {
      frame = 0;
      const index = mostVisibleSection(elements.map(element => element?.getBoundingClientRect() ?? { top: 0, bottom: 0 }), window.innerHeight);
      if (index === current.current) return;
      current.current = index;
      if (delayed.current) clearTimeout(delayed.current);
      if (active.current) narrator.current?.silence();
      // Wait for scrolling to settle on a section rather than reading every crossing.
      if (active.current && index >= 0) {
        delayed.current = setTimeout(() => {
          if (active.current && current.current === index && !document.hidden) narrator.current?.read(homeNarration[index]);
        }, 700);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(schedule, { threshold: [0, 0.1, 0.3, 0.6, 1] });
    elements.forEach(element => { if (element) observer.observe(element); });
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const visibility = () => {
      if (!document.hidden) return;
      active.current = false;
      setEnabled(false);
      if (delayed.current) clearTimeout(delayed.current);
      narrator.current?.pause();
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", visibility);
      cancelAnimationFrame(frame);
      if (delayed.current) clearTimeout(delayed.current);
      active.current = false;
      narrator.current?.dispose();
      narrator.current = null;
    };
  }, []);

  function toggle() {
    if (enabled) {
      active.current = false;
      setEnabled(false);
      if (delayed.current) clearTimeout(delayed.current);
      narrator.current?.pause();
      return;
    }
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setState({ title: "", reading: false, error: "La lecture vocale n’est pas disponible dans ce navigateur." });
      return;
    }
    if (!narrator.current) {
      narrator.current = new SectionNarrator(window.speechSynthesis, next => {
        setState(next);
        if (next.error) { active.current = false; setEnabled(false); }
      });
    }
    const index = current.current;
    if (index < 0) {
      setState({ title: "", reading: false, error: "Faites défiler la page jusqu’à une section pour commencer la visite." });
      return;
    }
    setState({ title: "", reading: false });
    active.current = true;
    setEnabled(true);
    narrator.current.resume(homeNarration[index]);
  }

  return <aside className="narrator" aria-label="Visite audio de la page d’accueil">
    {state.error && <p className="narrator-message" role="alert">{state.error}</p>}
    {enabled && <p className="narrator-caption"><Headphones size={14} aria-hidden="true" />{state.reading ? state.title : "La visite suit votre défilement"}</p>}
    <div className="narrator-dock">
      <button type="button" className="narrator-toggle" onClick={toggle} aria-pressed={enabled} aria-label={enabled ? "Mettre la visite audio en pause" : "Écouter la visite"}>
        {enabled ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
        <span>{enabled ? "Pause" : "Écouter la visite"}</span>
      </button>
      {enabled && <button type="button" className="narrator-replay" aria-label="Réécouter cette section" onClick={() => {
        if (delayed.current) clearTimeout(delayed.current);
        if (current.current >= 0) narrator.current?.read(homeNarration[current.current], true);
      }}><RotateCcw size={17} aria-hidden="true" /></button>}
    </div>
    <span className="narrator-sr" role="status">{enabled ? `Visite audio activée. ${state.title}` : "Visite audio en pause"}</span>
  </aside>;
}
