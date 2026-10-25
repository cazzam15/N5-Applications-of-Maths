// Network-first service worker: always tries the live site so updates arrive straight away,
// and falls back to the cached copy when offline. Relative paths so it works at /<Repo>/ and behind a proxy.
const CACHE_NAME='nat5-applications-of-maths-v1';
const ASSETS=['./','./index.html','./assets/styles.css?v=1','./assets/data.js?v=1','./assets/app.js?v=1','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(res=>{
    if(res&&res.ok){const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));}
    return res;
  }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
