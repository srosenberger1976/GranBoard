const CACHE_NAME = 'granboard-v3'; // Version erhöht, damit das Handy das Update sofort lädt
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './Bull.wav',
  './Bull-laut.wav',
  './Bull-lauter.wav',
  './Doppel-lauter.wav',
  './Einfach-pip.wav',
  './Gewonnen.wav',
  './Trippel-pip.wav',
  './Trippel17-lauter.wav',
  './Trippel18-lauter.wav',
  './Trippel19-lauter.wav',
  './Trippel20-lauter.wav',
  './Vorbei.wav',
  './spielerwechsel.wav',
  './überworfen.wav' // Jetzt erfolgreich hinzugefügt!
];

// Installieren und Assets in den Cache laden
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktivieren und alten Cache löschen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch-Event (Zwingend erforderlich für PWA)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
