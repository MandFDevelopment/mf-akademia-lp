/**
 * One-off generator for brand-temporary images.
 * Produces:
 *   - public/og-image.png        (1200x630 OGP)
 *   - app/icon.png               (32x32 favicon)
 *   - app/apple-icon.png         (180x180 Apple touch icon)
 *
 * Run:  bun run scripts/generate-brand-images.ts
 */
import sharp from "sharp"
import { mkdir, writeFile, unlink } from "node:fs/promises"
import path from "node:path"

const NAVY = "#0F1B3C"
const AMBER = "#F59E0B"
const NAVY_DEEP = "#070D24"

const projectRoot = path.resolve(import.meta.dirname ?? process.cwd(), "..")

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY_DEEP}"/>
      <stop offset="1" stop-color="${NAVY}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.55">
      <stop offset="0" stop-color="${AMBER}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${AMBER}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g font-family="'Noto Sans JP','Helvetica Neue',Arial,sans-serif" fill="#FFFFFF">
    <text x="80" y="200" font-size="32" font-weight="500" letter-spacing="6" fill="${AMBER}">MF-AKADEMIA</text>
    <text x="80" y="320" font-size="78" font-weight="800" letter-spacing="-1">AI &#215; BIM &#47; CAD</text>
    <text x="80" y="410" font-size="78" font-weight="800" letter-spacing="-1">リスキリング研修</text>
    <text x="80" y="500" font-size="28" font-weight="500" fill="#C8D1EA">全 432 本 &#47; 人材開発支援助成金 3&#47;4 対応</text>
    <text x="80" y="560" font-size="22" font-weight="400" fill="#9AA4C7">株式会社 M&#38;F</text>
  </g>
  <rect x="1080" y="60" width="56" height="6" fill="${AMBER}"/>
</svg>`

const iconSvg = (size: number, fontSize: number) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="${NAVY}"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
        font-family="'Helvetica Neue',Arial,sans-serif" font-weight="800"
        font-size="${fontSize}" fill="#FFFFFF" letter-spacing="-1">MF</text>
  <rect x="${Math.round(size * 0.15)}" y="${Math.round(size * 0.82)}" width="${Math.round(size * 0.7)}" height="${Math.max(2, Math.round(size * 0.05))}" fill="${AMBER}"/>
</svg>`

async function main() {
  const publicDir = path.join(projectRoot, "public")
  const appDir = path.join(projectRoot, "app")
  await mkdir(publicDir, { recursive: true })

  // OGP
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(publicDir, "og-image.png"))
  console.log("✓ public/og-image.png (1200x630)")

  // Favicon (32)
  await sharp(Buffer.from(iconSvg(512, 300)))
    .resize(32, 32)
    .png()
    .toFile(path.join(appDir, "icon.png"))
  console.log("✓ app/icon.png (32x32)")

  // Apple touch icon (180)
  await sharp(Buffer.from(iconSvg(512, 300)))
    .resize(180, 180)
    .png()
    .toFile(path.join(appDir, "apple-icon.png"))
  console.log("✓ app/apple-icon.png (180x180)")

  // Remove the default Next.js favicon.ico so icon.png takes precedence.
  try {
    await unlink(path.join(appDir, "favicon.ico"))
    console.log("✓ removed app/favicon.ico (superseded by icon.png)")
  } catch {
    // already gone
  }

  // Save the OG SVG source for future tweaks.
  await writeFile(path.join(projectRoot, "scripts/og-image.svg"), ogSvg)
  console.log("✓ scripts/og-image.svg (source)")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
