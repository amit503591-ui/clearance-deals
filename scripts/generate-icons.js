import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Base Brand SVG (Modern Deal Tag with Lightning & % cut)
const brandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E11D48"/>
      <stop offset="50%" stop-color="#BE123C"/>
      <stop offset="100%" stop-color="#881337"/>
    </linearGradient>
    <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F1F5F9"/>
    </linearGradient>
    <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#EAB308"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>

  <!-- Inner Subtle Accent Ring -->
  <rect x="16" y="16" width="480" height="480" rx="98" fill="none" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="4"/>

  <!-- Glowing Deal Tag Icon with Shadow -->
  <g filter="url(#shadow)">
    <!-- Slanted Price Tag Shape -->
    <path d="M 180 110 
             L 332 110 
             L 402 180 
             L 282 402 
             C 272 420 248 420 238 402 
             L 110 274 
             C 100 264 100 248 110 238 
             Z" 
          fill="url(#tagGrad)"/>

    <!-- Eyelet hole of price tag -->
    <circle cx="210" cy="160" r="22" fill="#E11D48"/>

    <!-- Lightning Bolt / Flash Sale icon -->
    <path d="M 285 160 
             L 215 270 
             L 260 270 
             L 230 355 
             L 320 240 
             L 275 240 
             Z" 
          fill="url(#boltGrad)" 
          stroke="#CA8A04" 
          stroke-width="3" 
          stroke-linejoin="round"/>
  </g>

  <!-- Clearance Badge text pill at bottom -->
  <g transform="translate(136, 420)">
    <rect width="240" height="54" rx="27" fill="#0F172A" fill-opacity="0.9"/>
    <text x="120" y="34" font-family="system-ui, -apple-system, Roboto, sans-serif" font-weight="900" font-size="24" fill="#FACC15" text-anchor="middle" letter-spacing="3">CLEARANCE</text>
  </g>
</svg>`;

// 2. Maskable SVG (with 15% safe padding around all sides so Android circles/squircles don't clip the icon)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E11D48"/>
      <stop offset="50%" stop-color="#BE123C"/>
      <stop offset="100%" stop-color="#881337"/>
    </linearGradient>
    <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F1F5F9"/>
    </linearGradient>
    <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#EAB308"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Full-bleed background for maskable target -->
  <rect width="512" height="512" fill="url(#bgGrad)"/>

  <!-- Centered safe-zone group (scaled to 74% and centered) -->
  <g transform="translate(66, 66) scale(0.74)">
    <g filter="url(#shadow)">
      <path d="M 180 110 
               L 332 110 
               L 402 180 
               L 282 402 
               C 272 420 248 420 238 402 
               L 110 274 
               C 100 264 100 248 110 238 
               Z" 
            fill="url(#tagGrad)"/>

      <circle cx="210" cy="160" r="22" fill="#E11D48"/>

      <path d="M 285 160 
               L 215 270 
               L 260 270 
               L 230 355 
               L 320 240 
               L 275 240 
               Z" 
            fill="url(#boltGrad)" 
            stroke="#CA8A04" 
            stroke-width="3" 
            stroke-linejoin="round"/>
    </g>

    <g transform="translate(136, 420)">
      <rect width="240" height="54" rx="27" fill="#0F172A" fill-opacity="0.9"/>
      <text x="120" y="34" font-family="system-ui, -apple-system, Roboto, sans-serif" font-weight="900" font-size="24" fill="#FACC15" text-anchor="middle" letter-spacing="3">CLEARANCE</text>
    </g>
  </g>
</svg>`;

async function generate() {
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), brandSvg);
  console.log('Created icon.svg');

  // Generate 512x512 standard icon
  await sharp(Buffer.from(brandSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Created pwa-512x512.png');

  // Generate 192x192 standard icon
  await sharp(Buffer.from(brandSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Created pwa-192x192.png');

  // Generate 512x512 maskable icon
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Created pwa-maskable-512x512.png');

  // Generate 180x180 Apple Touch Icon
  await sharp(Buffer.from(brandSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // Generate 64x64 favicon.ico
  await sharp(Buffer.from(brandSvg))
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created favicon.ico');

  // Generate static manifest files as well
  const manifest = {
    id: "/",
    name: "Clearance Deals",
    short_name: "Clearance",
    description: "Official Android app for ClearanceDeals.info with offline cache and instant discount alerts.",
    theme_color: "#dc2626",
    background_color: "#0f172a",
    display: "standalone",
    orientation: "portrait",
    start_url: "/",
    scope: "/",
    categories: ["shopping", "deals", "lifestyle"],
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/pwa-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };

  fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(publicDir, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Created manifest.json and manifest.webmanifest');

  console.log('All icons and manifests generated successfully!');
}

generate().catch(err => {
  console.error('Failed to generate icons:', err);
  process.exit(1);
});
