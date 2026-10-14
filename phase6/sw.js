// Offline app shell. Everything (pages, scripts, face models) is cached after the first visit, so the app opens even when the local
// server (start.bat) is not running. Student data is never cached here: it lives in IndexedDB.
const CACHE = 'eduface-phase6-20261014120417';
const PREFIX = 'eduface-phase6-';
const FILES = [
 "./app.css",
 "./docs/accuracy.html",
 "./docs/privacy.html",
 "./docs/running.html",
 "./docs/training.html",
 "./icon.svg",
 "./index.html",
 "./js/accounts.js",
 "./js/attendance.js",
 "./js/audit.js",
 "./js/auth.js",
 "./js/backup.js",
 "./js/boot.js",
 "./js/crypto.js",
 "./js/db.js",
 "./js/face.js",
 "./js/help.js",
 "./js/i18n.js",
 "./js/kiosk.js",
 "./js/messages.js",
 "./js/phase.js",
 "./js/reports.js",
 "./js/retention.js",
 "./js/school.js",
 "./js/selftest-runner.js",
 "./js/shell.js",
 "./js/util.js",
 "./js/visitors.js",
 "./lib/face-api.js",
 "./lib/jsQR.js",
 "./lib/LICENSE-face-api.txt",
 "./lib/LICENSE-jsQR.txt",
 "./lib/LICENSE-qrcode-generator.txt",
 "./lib/models/face_landmark_68_tiny_model-weights_manifest.json",
 "./lib/models/face_landmark_68_tiny_model.bin",
 "./lib/models/face_recognition_model-weights_manifest.json",
 "./lib/models/face_recognition_model.bin",
 "./lib/models/tiny_face_detector_model-weights_manifest.json",
 "./lib/models/tiny_face_detector_model.bin",
 "./lib/qrcode.js",
 "./manifest.webmanifest",
 "./selftest.html",
 "./"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  // look ONLY in this version's cache (caches.match() alone would also find files from an older version)
  e.respondWith(caches.open(CACHE).then(c => c.match(req, { ignoreSearch: true })).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => (req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))));
});
