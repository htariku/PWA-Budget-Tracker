const APP_PREFIX = 'FoodFest-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
const FILES_TO_CACHE = [
    "./index.html",
    "./assets/css/style.css",
  ];
  
  self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('installing cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE)
      })
    )
  })
  self.addEventListener('activate', function (e) {
    e.waitUntil(
      caches.keys().then(function (keyList) {
        let cacheKeeplist = keyList.filter(function (key) {
          return key.indexOf(APP_PREFIX),
          cacheKeeplist.push(CACHE_NAME);
        });
        