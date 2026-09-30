# Clearance Deals Android App & PWA

> Official Android application and Progressive Web App for **[clearancedeals.info](https://clearancedeals.info/)**, providing real-time clearance markdown tracking, 100% offline IndexedDB browsing, Material You dynamic themes, AMOLED pure-black battery saving, and direct APK download.

---

## 📱 Direct Android APK Download

You can download and install the native Android APK package directly to your phone:

- **Direct Download Link**: [`/ClearanceDeals-v1.0.apk`](/ClearanceDeals-v1.0.apk)
- **File Size**: ~73 KB
- **Package Name**: `info.clearancedeals.app`
- **Supported Android Versions**: Android 5.0 (Lollipop, API 21) up to Android 14+ (API 34)

### How to Install the APK on Android:
1. Tap **Download APK** on the app's top bar or Docs page.
2. Tap the download notification or open the file in your **Downloads** folder.
3. If Android prompts "Install unknown apps", grant permission for your browser in Settings.
4. Tap **Install** to complete installation.
5. The **Clearance Deals** icon will appear on your Android home screen!

---

## 🌟 Key Features

### 1. ⚡ Latest Clearance Deals Feed
- Ingests verified markdown deals directly from the live WordPress REST API (`https://clearancedeals.info/wp-json/wp/v2/posts`).
- Parses sale prices, computes markdown discounts (`-30%` to `-80%`), original list prices, and verified stock.
- Direct 1-tap checkout on Amazon and participating retailers.

### 2. 🛡️ 100% Offline IndexedDB Engine
- Complete offline capability: all deals, image URLs, categories, and bookmarks are cached locally inside the browser's native IndexedDB.
- **Preload 40+ Latest Deals**: 1-tap batch caching of latest deals and product photos for flights, subway commutes, or zero-connectivity areas.
- **Simulate Offline Toggle**: Test offline performance with a single click without disabling device Wi-Fi.

### 3. 🎨 Material You & AMOLED Theme Engine
- **AMOLED Pure-Black**: Disables OLED pixels (`#000000`) for maximum battery conservation.
- **Slate Dark Mode**: Deep, elegant navy-slate interface for evening reading.
- **High-Contrast Light Mode**: Clean, daylight-optimized high-contrast view.
- **5 Dynamic Material You Palettes**:
  - Crimson Flame (`#e11d48`)
  - Emerald Leaf (`#059669`)
  - Cyber Blue (`#0284c7`)
  - Electric Violet (`#7c3aed`)
  - Amber Glow (`#d97706`)

### 4. 🎯 Android Gesture Navigation & Scroll Controls
- **Touch Fix**: Native `touch-action: pan-y` and concrete `100dvh` viewport constraints for smooth touch scrolling on Android phones and tablets.
- **Swipe Down to Refresh**: Native Android pull-to-refresh with animated rotation indicator and haptic touch feedback.
- **Up & Down Arrow Navigation Pod**: Floating buttons at bottom right to quickly jump one screen up or down, or double-tap to reach the top/bottom.
- **Interactive Vertical Scroll Slider**: Real-time draggable slider track on the right edge showing scroll percentage (`Top`, `45%`, `Bottom`) to glide across deals instantly.

### 5. 🌐 Native Android WebView Browser
- Dedicated in-app WebView tab to browse `https://clearancedeals.info/` directly.
- Features SSL lock indicator, reload button, URL share sheet, external browser launcher, and automatic fallback to offline cached deals when disconnected.

### 6. 🏷️ Department & Budget Filters
- Department filters: Home & Kitchen, Electronics, Shoes, Video Games, Sports & Outdoors, Clothing.
- Quick budget chips: `All Deals`, `Under $25`, `Under $50`, and `50%+ OFF`.

### 7. ❤️ Offline Bookmarks & Native Sharing
- Bookmark favorite bargains locally with the Heart icon.
- Native Android Web Share API integration to send deals to WhatsApp, Telegram, SMS, or copy the direct link.

---

## 🛠️ Technology Stack & Architecture

| Component | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 8 + ESBuild |
| **Styling** | Tailwind CSS 4 + CSS Variables |
| **Offline Storage** | IndexedDB (`clearance-deals-db`) + Workbox CacheStorage |
| **Service Worker** | Workbox v7 (`NetworkFirst` for API, `CacheFirst` for product images) |
| **PWA Manifest** | Standalone Android PWA with maskable icons |
| **Android APK** | Standalone Android application bundle (`.apk`) |

---

## 🚀 Development & Build Instructions

### Development Server:
```bash
npm run dev
```
Starts Vite dev server on port `3000`.

### Production Build:
```bash
npm run build
```
Generates production assets, Service Worker, and PWA manifest in `dist/`.

### TypeScript Linting:
```bash
npm run lint
```
Checks for any type errors.

---

## 📄 License

Open-source MIT License. Content and markdown feeds provided by [clearancedeals.info](https://clearancedeals.info/).
