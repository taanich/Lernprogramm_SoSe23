// Name des Cache-Speichers
const CACHE_NAME = 'my-cache';

// Ressourcen, die im Cache gespeichert werden sollen
const urlsToCache = [
    '/',
    '/index.html',
    '/mathematik.html',
    '/internettechnologie.html',
    '/allgemeinwissen.html',
    '/stylesheet.css',
    '/mvp/mvp.js',
    '/images/01_HTWD_logo_RGB_wordmark_color.png',
    '/images/03_HTWD_logo_RBG_horizontal_color.png',
];

// Installationsereignis: Ressourcen im Cache speichern
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Abrufenereignis: Ressourcen aus dem Cache abrufen oder Netzwerk anfragen
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Ressource im Cache gefunden, zurückgeben
                if (response) {
                    return response;
                }
                // Ressource nicht im Cache gefunden, Netzwerkanfrage stellen
                return fetch(event.request);
            })
    );
});

// Löschereignis: Alte Cache-Speicher bereinigen
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
            .then(function(cacheNames) {
                return Promise.all(
                    cacheNames.filter(function(name) {
                        return name !== CACHE_NAME;
                    }).map(function(name) {
                        return caches.delete(name);
                    })
                );
            })
    );
});
