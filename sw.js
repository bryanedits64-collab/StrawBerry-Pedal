const CACHE_NAME = 'strawberry-pedals-mobile-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './strawberry-pedals-logo.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    // Three.js is a classic cross-origin script. Cache its opaque response so
    // the game can still start offline after the first successful online visit.
    try {
      const response = await fetch(THREE_CDN, { mode: 'no-cors', cache: 'reload' });
      await cache.put(THREE_CDN, response);
    } catch (_) {
      // The app remains installable; the 3D game needs a connection until
      // the browser has successfully fetched and cached Three.js once.
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('strawberry-pedals-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate') {
      event.respondWith((async () => {
        try {
          const response = await fetch(request);
          const cache = await caches.open(CACHE_NAME);
          cache.put('./index.html', response.clone());
          return response;
        } catch (_) {
          return (await caches.match('./index.html')) || Response.error();
        }
      })());
    } else {
      event.respondWith((async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        try { return await fetch(request); }
        catch (_) { return Response.error(); }
      })());
    }
    return;
  }

  if (url.href === THREE_CDN) {
    event.respondWith((async () => {
      const cached = await caches.match(THREE_CDN);
      if (cached) return cached;
      return fetch(request);
    })());
  }
});
