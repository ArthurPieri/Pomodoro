const Event = require('./event.poc.class')

const event = new Event

event.on('event', () => {
    console.log('Foi')
})

console.log('rodou')

event.start()