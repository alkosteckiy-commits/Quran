const C='quran-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icon-180.png'])))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.hostname==='everyayah.com')return;
  if(u.pathname.includes('/data/')||u.hostname.includes('fonts.')){e.respondWith(caches.open(C).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{c.put(e.request,n.clone());return n}))));return}
  e.respondWith(fetch(e.request).then(n=>{caches.open(C).then(c=>c.put(e.request,n.clone()));return n}).catch(()=>caches.match(e.request)))});
