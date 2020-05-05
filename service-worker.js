
var cacheName = 'pwa-v1';

let files = [
  './css/demo.css',
  './',
  './icons/icon.png',
  './icons/icon-512.png',
  './manifest.json'
];

self.addEventListener('install', async (e) => {
  // cache files
  const cache = await caches.open(cacheName);
  await cache.addAll(files);
  self.skipWaiting();
});

self.addEventListener('fetch', async (e) => {
  const req = e.request;
  e.respondWith(networkFirst(req));
});

const networkFirst = async (req) => {
  // 打开缓存
  const cache = await caches.open(cacheName);
  // 优先使用获取网络内容
  try{
    const fresh = await fetch(req);
    // 获取网络内容后进行缓存并返回
    cache.put(req, fresh.clone());
    return fresh;
  } catch {
    // 从缓存中读取
    const cacheSource = await cache.match(req);
    return cacheSource;
  }
}

self.addEventListener('activate', async () => {
  console.log('active');
  // clear previous cache
  const keys = await caches.keys();
  keys.forEach((key) => {
    console.log(key);
    if (key !== cacheName) {
      caches.delete(key);
    }
  });
  self.clients.claim();
});