if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(function (registration) {
      // Successful registration
      console.log('Registration service-worker.js Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
    // Failed registration, service worker won’t be installed
    console.log('Whoops. service-worker.js registration failed, error:', err);
  });
}
