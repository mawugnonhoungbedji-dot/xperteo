import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../lib/ambient-audio.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
});
const { AmbientAudio, DEFAULT_MUSIC_VOLUME } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

class AudioParamMock {
  value = 0;
  targets = [];
  setValueAtTime() {}
  linearRampToValueAtTime() {}
  exponentialRampToValueAtTime() {}
  cancelScheduledValues() {}
  setTargetAtTime(value) { this.targets.push(value); }
}
class NodeMock {
  gain = new AudioParamMock();
  frequency = new AudioParamMock();
  delayTime = new AudioParamMock();
  connect() {}
  disconnect() {}
  start() {}
  stop() {}
}
class ContextMock {
  static blocked = false;
  static latest;
  state = "suspended";
  currentTime = 0;
  destination = {};
  oscillators = [];
  pending = [];
  master;
  constructor() { ContextMock.latest = this; }
  createGain() { const node = new NodeMock(); this.master ??= node; return node; }
  createBiquadFilter() { return new NodeMock(); }
  createDelay() { return new NodeMock(); }
  createOscillator() { const node = new NodeMock(); this.oscillators.push(node); return node; }
  resume() {
    if (ContextMock.blocked) return new Promise(resolve => this.pending.push(resolve));
    this.state = "running";
    return Promise.resolve();
  }
  unlock() { this.state = "running"; this.pending.splice(0).forEach(resolve => resolve()); }
  async suspend() { this.state = "suspended"; this.onstatechange?.(); }
  async close() { this.state = "closed"; }
}
globalThis.AudioContext = ContextMock;

test("allowed autoplay starts music at the soft default volume", async () => {
  ContextMock.blocked = false;
  const audio = new AmbientAudio();
  try {
    assert.equal(await audio.play(), true);
    assert.ok(ContextMock.latest.oscillators.length > 0);
    assert.equal(ContextMock.latest.master.gain.targets.at(-1), DEFAULT_MUSIC_VOLUME / 100);
    await audio.pause();
    assert.equal(ContextMock.latest.state, "suspended");
    assert.equal(ContextMock.latest.master.gain.targets.at(-1), 0);
    assert.equal(await audio.play(), true);
  } finally { audio.dispose(); }
});

test("blocked autoplay waits silently and starts after browser unlock", async () => {
  ContextMock.blocked = true;
  const audio = new AmbientAudio();
  try {
    const automatic = audio.play();
    assert.equal(ContextMock.latest.oscillators.length, 0);
    const interaction = audio.play();
    ContextMock.latest.unlock();
    assert.equal(await automatic, false);
    assert.equal(await interaction, true);
    assert.ok(ContextMock.latest.oscillators.length > 0);
  } finally { audio.dispose(); }
});

test("a late autoplay response cannot restart music after an explicit pause", async () => {
  ContextMock.blocked = true;
  const audio = new AmbientAudio();
  try {
    const automatic = audio.play();
    await audio.pause();
    ContextMock.latest.unlock();
    assert.equal(await automatic, false);
    assert.equal(ContextMock.latest.oscillators.length, 0);
    assert.equal(ContextMock.latest.master.gain.targets.at(-1), 0);
  } finally { audio.dispose(); }
});

test("a browser that never authorizes audio cannot leave playback waiting forever", async () => {
  ContextMock.blocked = true;
  const audio = new AmbientAudio();
  try {
    await assert.rejects(audio.play(), /Audio activation blocked/);
    assert.equal(ContextMock.latest.oscillators.length, 0);
    ContextMock.blocked = false;
    assert.equal(await audio.play(), true);
  } finally { audio.dispose(); }
});
