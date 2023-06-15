const cacheName = 'cache-v1';
const cacheFiles = [
    '/',
    '../index.html',
    '../stylesheet.css',
    '../scripts/mvp.js',
    '../images/01_HTWD_logo_RGB_wordmark_color.png',
    '../images/03_HTWD_logo_RGB_horizontal_color.png'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(cacheName)
        .then(cache => {
            cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', event => event.respondWith(
    caches.open(cacheName)
        .then(cache => cache.match(event.request))
        .then(response => response || fetch(event.request))
));