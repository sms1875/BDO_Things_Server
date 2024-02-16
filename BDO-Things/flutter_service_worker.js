'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "365547122264893bdf37c2ef4f295fce",
"assets/AssetManifest.json": "16755a1e2b2b8533f65f01656d88f0bd",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "b0afd38d2cf3a6999147c23ae21c281e",
"assets/images/icon/Alchemy.png": "36392248f7017df1f28b13e1e72109c9",
"assets/images/icon/Bartering.png": "65c1894ac679b33cf6cad28272d544f8",
"assets/images/icon/Cooking.png": "4995671d615aedfa8bc88cc4aa0f7a27",
"assets/images/icon/design_crate/9601.webp": "f28a3a1f053394cc21dc36219c38d4fa",
"assets/images/icon/design_crate/9602.webp": "82ad3ae299e90bb1395f383efa8f4279",
"assets/images/icon/design_crate/9603.webp": "1d476ee70a3fa7ab70ec2f77595d1810",
"assets/images/icon/design_crate/9604.webp": "1c85389341394c414419d2c1273518bc",
"assets/images/icon/design_crate/9605.webp": "5735b9d075632e4f9b29929f2452df54",
"assets/images/icon/design_crate/9606.webp": "6db32fc842d0a602f0ccf54f5ddb3dc1",
"assets/images/icon/design_crate/9607.webp": "a866be5fcef7e2a0eaf606f784842032",
"assets/images/icon/design_crate/9608.webp": "ce6c7865681a099ef042698a3ca32b39",
"assets/images/icon/design_crate/9609.webp": "105538b10d6ee53f16f941c437144c0f",
"assets/images/icon/design_crate/9610.webp": "105538b10d6ee53f16f941c437144c0f",
"assets/images/icon/design_crate/9611.webp": "105538b10d6ee53f16f941c437144c0f",
"assets/images/icon/design_crate/9612.webp": "105538b10d6ee53f16f941c437144c0f",
"assets/images/icon/design_crate/9613.webp": "1b324656964a09d4a2cd1a5ec2412f59",
"assets/images/icon/design_crate/9614.webp": "558538daa0b0497111b23c9504d0e0d8",
"assets/images/icon/design_crate/9618.webp": "3556d4667e9df0b76ad451feba8d7cd1",
"assets/images/icon/design_crate/9619.webp": "b1c72a7f7e3a1c5182f994674e2aef87",
"assets/images/icon/design_crate/9651.webp": "3bc1b14da57b9134b2499926eb8644fe",
"assets/images/icon/design_crate/9652.webp": "d4156107e175978caf676d244f976bed",
"assets/images/icon/design_crate/9653.webp": "e78913d5fb4c72e7e3a6e7972912dc50",
"assets/images/icon/design_crate/9654.webp": "54a398e3a2a5f15482aafade5f8df94e",
"assets/images/icon/design_crate/9655.webp": "457713b40fa735a5ba919ea5d9c430cd",
"assets/images/icon/design_crate/9662.webp": "121c01d452353fce7e63e5b173068c84",
"assets/images/icon/design_crate/9663.webp": "f8f71a6146d6a3d660e214665f4e0c43",
"assets/images/icon/design_crate/9672.webp": "909aca638b3c413cf2aec48d90f5c0db",
"assets/images/icon/design_crate/9673.webp": "27ddb614370b1e30899c6b139436c701",
"assets/images/icon/design_crate/9674.webp": "6a96ccfab834dab9fb3185cad9cf2b8b",
"assets/images/icon/design_crate/9675.webp": "ebe2f89bc8b6fbcabe74195c83aa9d91",
"assets/images/icon/design_crate/9676.webp": "5efabbd8c637765ebf19623027c8fdd9",
"assets/images/icon/design_crate/9677.webp": "50e37291fa66e18a15a7c0f668847eea",
"assets/images/icon/Farming.png": "452edc31be94be408566a7fc64302690",
"assets/images/icon/Fishing.png": "fa8dcdb411a35a7152497ac55bf5e3a8",
"assets/images/icon/Gathering.png": "7a93347e5a7011c89256d387d932363d",
"assets/images/icon/Hunting.png": "4ec629e4916bedc103bd83b84fbbbad8",
"assets/images/icon/Processing.png": "9502e6fe815cb9b995d21fd18ffda062",
"assets/images/icon/Sailing.png": "555b96b1ede9bbd2e815ecd1e2ebb384",
"assets/images/icon/tradeCrate.png": "648eda80e191352a4cc85a03bd9718d5",
"assets/images/icon/Trading.png": "ceb484f864c18a6a51092270b12db234",
"assets/images/icon/Training.png": "9e51e0047764ffb1c19e2fd958d447d8",
"assets/json/design_crate.json": "357758660cc51079de3efcc48074909e",
"assets/NOTICES": "6ef64879a8b913954a038b94ea398c43",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/timezone/data/latest_all.tzf": "871b8008607c14f36bae2388a95fdc8c",
"assets/packages/window_manager/images/ic_chrome_close.png": "75f4b8ab3608a05461a31fc18d6b47c2",
"assets/packages/window_manager/images/ic_chrome_maximize.png": "af7499d7657c8b69d23b85156b60298c",
"assets/packages/window_manager/images/ic_chrome_minimize.png": "4282cd84cb36edf2efb950ad9269ca62",
"assets/packages/window_manager/images/ic_chrome_unmaximize.png": "4a90c1909cb74e8f0d35794e2f61d8bf",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "8c9ab94b3e7d4f85ca01c1b0a1e54bd1",
"canvaskit/canvaskit.wasm": "bcb5f27f1d4462c23499b5f5c73eadbf",
"canvaskit/chromium/canvaskit.js": "56facd8978a5292c9bb1d06dfcaee271",
"canvaskit/chromium/canvaskit.wasm": "a1bdb8e068b45f18affefaf412122091",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d9d2a4b0bccb63bcedea89f95078411f",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "1f1f1197a4986074b8c19a69b47bb26f",
"/": "1f1f1197a4986074b8c19a69b47bb26f",
"main.dart.js": "9263272d8ad7683f925764165fde4291",
"manifest.json": "9b62272e1dc784f061b813c85c2e7d9b",
"version.json": "2ce216e5fc3f1dc43c19966d6125b7d4"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
