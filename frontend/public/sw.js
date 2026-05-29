self.addEventListener('push', function(event) {
    const data = event.data?.json() ?? {}
    event.waitUntil(
        self.registration.showNotification(data.title ?? 'Buanderie ENSIAS', {
            body:  data.body ?? 'Notification',
            icon:  '/logo-buanderie.png',
            data:  data.data,
        })
    )
})

self.addEventListener('notificationclick', function(event) {
    event.notification.close()
    event.waitUntil(clients.openWindow('/student/dashboard'))
})