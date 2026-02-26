const cacheName = 'monika-v2';
const staticAssets = ['./', './index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(staticAssets)));
});

// Slušanje poruke za slanje obavijesti
self.addEventListener('message', event => {
  if (event.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046747.png',
      vibrate: [200, 100, 200],
      tag: 'timer-notification', // Spriječava gomilanje obavijesti
      renotify: true
    });
  }
});
