const Timer = require('../src/model/timer.model')
require('../src/db/mongoose')

let createTimer = async () => {
    let timer = new Timer({
        name: 'Arthur',
        chatId: 12360288,
        interval: {},
        opt: ''
      })
      
    try{
        await timer.save()
        timer.startTimer()
        console.log(timer)
        setTimeout(() => {
            console.log(timer.time)
        },500)
    }catch(e){
        console.log(e)
    }
}

createTimer()