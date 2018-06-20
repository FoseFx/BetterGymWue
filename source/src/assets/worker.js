self.addEventListener('push', event => {
  event.waitUntil(function () {
    let body = "Some Msg";
    self.registration.showNotification('Dein Stundenplan', {body:body, icon: 'assets/logo/128.png'})
  });
});
