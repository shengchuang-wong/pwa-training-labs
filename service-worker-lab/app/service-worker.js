self.addEventListener('install', event => {
  console.log('Service worker installing...')

  // trigger activate 
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  console.log('Service worker activating...')
})

// I'm a new service worker

self.addEventListener('fetch', event => {
  console.log('Fetching', event.request.url)
})