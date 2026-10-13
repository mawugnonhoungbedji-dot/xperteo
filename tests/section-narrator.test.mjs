import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function loadModule(path) {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}
const { SectionNarrator } = await loadModule("../lib/section-narrator.ts");
const { mostVisibleSection, homeNarration } = await loadModule("../lib/home-narration.ts");

function fixture() {
  const states = [];
  const speech = {
    spoken: [], cancelled: 0, paused: 0, resumed: 0,
    getVoices: () => [{ lang: "en-US" }, { lang: "fr-FR" }],
    speak(utterance) { this.spoken.push(utterance); },
    cancel() { this.cancelled++; },
    pause() { this.paused++; },
    resume() { this.resumed++; },
  };
  const narrator = new SectionNarrator(speech, state => states.push(state), text => ({ text }));
  return { narrator, speech, states };
}

test("large sections remain eligible even when taller than the viewport", () => {
  assert.equal(mostVisibleSection([{ top: -100, bottom: 1300 }, { top: 1300, bottom: 1800 }], 800), 0);
  assert.equal(mostVisibleSection([{ top: -1200, bottom: 100 }, { top: 100, bottom: 1100 }], 800), 1);
  assert.equal(mostVisibleSection([{ top: 900, bottom: 1200 }], 800), -1);
});

test("starting another section cancels the previous voice and ignores stale callbacks", () => {
  const { narrator, speech, states } = fixture();
  narrator.read(homeNarration[0]);
  const old = speech.spoken[0];
  narrator.read(homeNarration[1]);
  const length = states.length;
  old.onend();
  assert.equal(states.length, length);
  assert.equal(speech.cancelled, 2);
  assert.equal(speech.spoken[1].lang, "fr-FR");
  assert.equal(speech.spoken[1].voice.lang, "fr-FR");
});

test("scrolling back does not automatically repeat a section; manual replay does", () => {
  const { narrator, speech } = fixture();
  narrator.read(homeNarration[0]);
  narrator.read(homeNarration[1]);
  narrator.read(homeNarration[0]);
  assert.equal(speech.spoken.length, 2);
  assert.equal(speech.cancelled, 3);
  narrator.read(homeNarration[0], true);
  assert.equal(speech.spoken.length, 3);
});

test("pause resumes in place, while changing sections during pause starts the new section", () => {
  const { narrator, speech } = fixture();
  narrator.read(homeNarration[0]);
  narrator.pause();
  narrator.resume(homeNarration[0]);
  assert.equal(speech.paused, 1);
  assert.equal(speech.resumed, 1);
  assert.equal(speech.spoken.length, 1);
  narrator.pause();
  narrator.resume(homeNarration[1]);
  assert.equal(speech.spoken.length, 2);
});

test("leaving the page cancels speech and invalidates completion callbacks", () => {
  const { narrator, speech, states } = fixture();
  narrator.read(homeNarration[0]);
  narrator.dispose();
  const length = states.length;
  speech.spoken[0].onend();
  assert.equal(states.length, length);
  assert.equal(speech.cancelled, 2);
});
