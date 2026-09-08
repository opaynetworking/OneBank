(function() {
  'use strict';
  
  // Force dark theme
  document.documentElement.style.colorScheme = 'dark';
  
  // Register new service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          // Forcefully check for updates on every load!
          registration.update();
        })
        .catch(function(error) {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
  
  // Automatically clear all caches on load to prevent old data
  if ('caches' in window) {
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(name) {
        return caches.delete(name);
      }));
    });
  }
})();