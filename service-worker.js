const CACHE = "mirto-v3";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/mirto-192.png",
  "./icons/mirto-512.png",
  "./calendario-1.png",
  "./calendario-2.png",
  "./orari-bernina.jpeg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
