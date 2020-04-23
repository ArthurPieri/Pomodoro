const notifySend = require('node-notifier').NotifySend
const Notifier = require('node-notifier')

// String
Notifier.notify('Message')

// Object
Notifier.notify({
    title: 'My notification',
    message: 'Helo, there!'
})

let notifier = new notifySend()

notifier.notify({
    title: 'Teste',
    message: 'Hello world',
    urgency: undefined,
    time: undefined,
    category: undefined,
    hint: undefined
})