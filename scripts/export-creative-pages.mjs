import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const manifestPath = path.join(process.cwd(), "docs", "creative-page-prompts.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
for (const asset of manifest.images) {
  const master = path.join(process.cwd(), "public", "images", "brand", `${asset.name}.master.png`);
  await fs.copyFile(asset.source, master);
  const metadata = await sharp(master).metadata();
  const output = path.join(process.cwd(), "public", "images", "brand", `${asset.name}.cutout.4k.webp`);
  await sharp(master).resize(3072, 3840, { fit: "contain", kernel: "lanczos3", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .sharpen({ sigma: .45, m1: .35, m2: .75 })
    .webp({ quality: 96, alphaQuality: 100, effort: 4, smartSubsample: true }).toFile(output);
  const exported = await sharp(output).metadata();
  const stats = await sharp(output).stats();
  if (!exported.hasAlpha || stats.channels[3].min !== 0) throw new Error(`Missing alpha: ${asset.name}`);
  asset.master = master;
  asset.output = output;
  asset.sourceSize = [metadata.width, metadata.height];
  asset.exportSize = [exported.width, exported.height];
  process.stdout.write(`${asset.name}: ${exported.width} x ${exported.height}, alpha verified\n`);
}
manifest.exportMethod = "3072 x 3840 WebP enlargement from generated PNG masters; not native 4K generation.";
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
