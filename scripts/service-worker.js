self.addEventListener('install', event => event.waitUntil(
    caches.open('pwa1').then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/stylesheet.css',
            '/scripts/mvp.js.js',
            '/images/01_HTWD_logo_RGB_wordmark_color.png',
            '/images/03_HTWD_logo_RGB_horizontal_color.png',
        ]);
    })
));


self.addEventListener('fetch', event => event.respondWith(
    caches.open('pwa1')
        .then(cache => cache.match(event.request))
        .then(response => response || fetch(event.request))
));