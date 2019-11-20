self.addEventListener('install', event => {
    console.log('Service worker installing...');

    // Slight change in sw.. in order to test the update functionality

    // Add a call to skipWaiting
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
});