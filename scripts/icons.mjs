// Generates PWA icons into public/icons. Run: node scripts/icons.mjs
import sharp from "sharp";

const svg = (pad) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${pad ? 0 : 112}" fill="#fff8f0"/>
  <g transform="translate(256 256) scale(${pad ? 0.72 : 0.9}) translate(-256 -256)">
    <rect x="56" y="56" width="190" height="190" rx="48" fill="#c8f0dc"/>
    <rect x="266" y="56" width="190" height="190" rx="48" fill="#ffd9c7"/>
    <rect x="56" y="266" width="190" height="190" rx="48" fill="#e2d8fb"/>
    <rect x="266" y="266" width="190" height="190" rx="48" fill="#cfe6fb"/>
    <g stroke="#4a4458" stroke-width="22" stroke-linecap="round">
      <path d="M151 106v90M106 151h90"/>
      <path d="M316 151h90"/>
      <path d="M119 329l64 64M183 329l-64 64"/>
      <path d="M316 340h90M316 382h90"/>
    </g>
  </g>
</svg>`;

const out = "public/icons";
await sharp(Buffer.from(svg(false))).resize(192).png().toFile(`${out}/icon-192.png`);
await sharp(Buffer.from(svg(false))).resize(512).png().toFile(`${out}/icon-512.png`);
await sharp(Buffer.from(svg(true))).resize(512).png().toFile(`${out}/maskable-512.png`);
await sharp(Buffer.from(svg(true))).resize(180).png().toFile(`${out}/apple-touch-icon.png`);
console.log("icons ok");
