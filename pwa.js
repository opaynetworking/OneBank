/* ===== PWA Setup & Dark Mode Enhancements ===== */
(function() {
  'use strict';
  
  // --- 1. Force Dark Theme & Status Bar Color ---
  document.documentElement.style.colorScheme = 'dark';
  
  // Ensure the meta theme-color is set for the status bar (iOS and Android)
  let metaTheme = document.querySelector('meta[name="theme-color"]');
  if (!metaTheme) {
    metaTheme = document.createElement('meta');
    metaTheme.name = 'theme-color';
    metaTheme.content = '#0d0d0f';
    document.head.appendChild(metaTheme);
  } else {
    metaTheme.content = '#0d0d0f';
  }
  
  // --- 2. Register Service Worker for Standalone/Offline ---
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
  
  // --- 3. Handle "Add to Home Screen" Prompt (For Chrome/Android) ---
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome's default mini-infobar
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
  });
  
  // Example: Automatically prompt the user to install after 5 seconds (Optional)
  setTimeout(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
      });
    }
  }, 5000);
  
  // --- 4. Detect if running as a standalone app (iOS/Android) ---
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isStandalone) {
    console.log('Running in standalone mode - Address bar hidden!');
  }
})();