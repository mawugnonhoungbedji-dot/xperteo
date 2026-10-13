import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const read = async (name) => JSON.parse(await fs.readFile(path.join(root, "docs", name), "utf8"));
const cutouts = [...(await read("brand-cutout-prompts.json")).images, ...(await read("page-campaign-prompts.json")).images];
const photo = (await read("brand-campaign-prompts.json")).images.find((asset) => asset.name === "drone");
const restoration = await read("brand-4k-restoration.json");
const assets = [...cutouts.map((asset) => ({ ...asset, transparent: true })), { ...photo, transparent: false }];
const report = [];
for (const asset of assets) {
  const source = asset.name === "reading" ? restoration.source : asset.source;
  const filename = `${asset.name}${asset.transparent ? ".cutout" : ""}.4k.webp`;
  const output = path.join(root, "public", "images", "brand", filename);
  const sourceMetadata = await sharp(source).metadata();
  await sharp(source)
    .resize(3072, 3840, { fit: "contain", kernel: "lanczos3", background: { r: 0, g: 0, b: 0, alpha: asset.transparent ? 0 : 1 } })
    .sharpen({ sigma: 0.45, m1: 0.35, m2: 0.75 })
    .webp({ quality: 96, alphaQuality: 100, effort: 4, smartSubsample: true })
    .toFile(output);
  const metadata = await sharp(output).metadata();
  const stats = asset.transparent ? await sharp(output).stats() : null;
  if (metadata.width !== 3072 || metadata.height !== 3840) throw new Error(`Unexpected resolution: ${filename}`);
  if (asset.transparent && (!metadata.hasAlpha || stats.channels[3].min !== 0)) throw new Error(`Missing transparency: ${filename}`);
  report.push({ filename, output, source, sourceSize: [sourceMetadata.width, sourceMetadata.height], exportSize: [metadata.width, metadata.height], transparent: metadata.hasAlpha, bytes: (await fs.stat(output)).size });
  process.stdout.write(`${filename}: ${metadata.width} x ${metadata.height}\n`);
}
await fs.writeFile(path.join(root, "docs", "brand-4k-exports.json"), JSON.stringify({ method: "Lanczos3 enlargement from original PNG masters, gentle sharpening, WebP quality 96. Reading portrait restored with image_gen. Exports are not native 4K generation.", restoration, assets: report }, null, 2));
