const fileToCache = [
  '/',
  'style/main.css',
  'images/still_life_medium.jpg',
  'index.html',
  'pages/offline.html',
  'pages/404.html'
]

const staticCachceName = 'pages-cache-v2'

// install service local and first cache file
self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets')
  event.waitUntil(
    caches.open(staticCachceName)
      .then(cache => {
        return cache.addAll(fileToCache)
      })
  )
  console.log('add files added into cached')
})


// cache file logic
self.addEventListener('fetch', event => {
  console.log('Fetch event for', event.request.url)

  event.respondWith(
    caches.match(event.request)
    .then(response => {

      if (response) {
        console.log('Found', event.request.url, ' in cache')
        return response
      }

      console.log('Network request for ', event.request.url)

      if(event.request.url.indexOf('http') === -1){
        //skip request
        return 
     }

      // TODO 4 - Add fetched files to be cache
      return fetch(event.request)
      .then(response => {
        // TODO - 5 Respond with custom 404 page
        if (response.status === 404) {
          return caches.match('pages/404.html')
        }
        return caches.open(staticCachceName).then(cache => {
          cache.put(event.request.url, response.clone())
          return response
        })
      })

    })
    .catch(error => {
      // TODO 6 - Respond with custom offline page
      console.log('error', error)
      return caches.match('pages/offline.html')
    })
  )
})

// delete cache here
self.addEventListener('activate', event => {
  console.log('Activating new service worker...')

  const cacheWhitelist = [staticCachceName]

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if(cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})