import fs from "node:fs/promises";
import sharp from "sharp";
const asset = JSON.parse(await fs.readFile("docs/privacy-crop-correction.json", "utf8"));
const master = "public/images/brand/silence-v2.master.png";
await fs.copyFile(asset.source, master);
await sharp(master).resize(3072, 3840, { fit: "contain", kernel: "lanczos3", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .sharpen({ sigma: .45, m1: .35, m2: .75 }).webp({ quality: 96, alphaQuality: 100, effort: 4, smartSubsample: true }).toFile(asset.output);
const metadata = await sharp(asset.output).metadata();
const stats = await sharp(asset.output).stats();
if (!metadata.hasAlpha || stats.channels[3].min !== 0) throw new Error("Transparency missing");
process.stdout.write(`${metadata.width} x ${metadata.height}, alpha verified\n`);
