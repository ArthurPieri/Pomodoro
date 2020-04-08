const Event = require('./event.class')

const event = new Event

event.on('event', () => {
    console.log('Foi')
})

console.log('rodou')

event.start()