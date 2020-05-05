
var cacheName = 'pwa-v1';

let files = [
  './css/demo.css',
  './',
  './icons/icon.png',
  './icons/icon-512.png',
  './manifest.json'
];

self.addEventListener('install', async (e) => {
  console.log('servicessss worker install');
  console.log(self);
  const cache = await caches.open(cacheName);
  await cache.addAll(files);
  self.skipWaiting();
});

self.addEventListener('fetch', async (e) => {
  const req = e.request;
  e.respondWith(networkFirst(req));
});

const networkFirst = async (req) => {
  const cache = await caches.open(cacheName);
  try{
    const fresh = await fetch(req);
    // 
    cache.put(req, fresh.clone());
    return fresh;
  } catch {
   
    const cacheSource = await cache.match(req);
    return cacheSource;
  }
}

self.addEventListener('activate', async () => {
  console.log('active');
  const keys = await caches.keys();
  keys.forEach((key) => {
    console.log(key);
    if (key !== cacheName) {
      caches.delete(key);
    }
  });
  self.clients.claim();
});