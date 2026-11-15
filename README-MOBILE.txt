# Strawberry Pedals — Mobile Install Package

This package turns the supplied responsive Strawberry Pedals app into an installable **mobile web app** for Android phones and iPhones. It opens in its own app-style window with a Strawberry Pedals icon, rather than staying in a normal browser tab.

## Important: host it before installing

Phones cannot install this ZIP directly as an app. First publish the files to a website using **HTTPS**. A static host such as GitHub Pages or Netlify can do this. Upload the *contents* of this folder (not the ZIP itself) so `index.html` is at the published site root.

The app uses Three.js from cdnjs. The service worker attempts to cache it after the first online visit so later launches may work offline. An internet connection is needed for the first successful load.

## Install on Android

1. Open the published HTTPS website in Chrome.
2. Tap **Install app** in the Strawberry Pedals page, or open Chrome's menu and choose **Install app** / **Add to Home screen**.
3. Confirm. The Strawberry Pedals icon will appear with your other apps.

## Install on iPhone

1. Open the published HTTPS website in **Safari**.
2. Tap the iOS **Share** button.
3. Choose **Add to Home Screen**.
4. Keep the name Strawberry Pedals and tap **Add**.
5. Launch it from the new home-screen icon.

## What's included

- `index.html` — original app with mobile install support; the source already includes responsive phone layouts and touch controls.
- `manifest.webmanifest` — app name, icon, colors and standalone launch settings.
- `sw.js` — app-shell and Three.js caching for repeat/offline launches.
- `icons/` — 180, 192 and 512 pixel app icons generated from the supplied logo.

## Limits to be aware of

- This is a cross-platform installable web app (PWA), **not** a signed Android APK or an iPhone App Store app.
- It does not add online accounts, multiplayer, chat, cloud saves or cross-device syncing. The existing demo account and save behaviour remains local to each browser/device.
- iPhone installation is done through Safari's Share menu; iOS does not use the Android APK format.
