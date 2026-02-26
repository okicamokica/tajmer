const cacheName = 'monika-v3';
const staticAssets = ['./', './index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(staticAssets)));
});

// Slanje obavijesti s gumbom
self.addEventListener('message', event => {
  if (event.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: 'icon.png', // Tvoja nova plava ikona
      vibrate: [200, 100, 200],
      tag: 'timer-notification',
      renotify: true,
      requireInteraction: true, // Obavijest ne nestaje dok ne klikneš
      actions: [
        { action: 'stop-alarm', title: '🛑 UGASI ALARM' }
      ]
    });
  }
});

// Reakcija na klik
self.addEventListener('notificationclick', event => {
  event.notification.close();

  // Ako je kliknut gumb "UGASI ALARM"
  if (event.action === 'stop-alarm') {
      // Šaljemo poruku nazad aplikaciji da ugasi zvuk
      self.clients.matchAll().then(clients => {
          clients.forEach(client => {
              client.postMessage({ type: 'STOP_ALL_AUDIO' });
          });
      });
  } else {
      // Ako je kliknuto bilo gdje drugdje na obavijest, otvori aplikaciju
      event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
          if (clientList.length > 0) return clientList[0].focus();
          return clients.openWindow('./index.html');
        })
      );
  }
});
