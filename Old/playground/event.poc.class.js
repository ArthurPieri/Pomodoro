const Emitter = require('events')

class test extends Emitter {
    super(){
        let a = 'A'
        let b = 'B'
    }
    start(){
        console.log('start')
        this.emit('event')
    }
    
}

module.exports = test