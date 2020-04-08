const Emitter = require('events')
const fs = require('fs')

class timer extends Emitter {
    constructor(){
        super()
        let interval = {}
        let time = (25*60)
        let workTime = (25*60)
        let lbTime = (25*20)
        let sbTime = (5*60)
        let repetitions = 0
        let nIntervals = 4
        try{
            const configJSON = fs.readFileSync('./src/config.json')
            const config = JSON.parse(configJSON)

            console.log

            this.time = ((config.wtime)*60)
            this.workTime = ((config.wtime)*60)
            this.lbTime = ((config.lbtime)*60)
            this.sbTime = ((config.sbtime)*60)
            this.nIntervals = ((config.nIntervals)*1)
            this.repetitions = 0
        }catch(e){
            console.log(e)
        }
    }
    startTimer(){
        console.log('Trabalhe')
        this.time = this.workTime
        this.opt = 'st'

        console.log(this.time)

        this.interval = setInterval(() => {
            this.time--

            if(this.time < 10 && this.time > 0){
                console.log(this.time)
            }

            if(this.time < 0 ){
                clearInterval(this.interval)
                console.log('Ding!')
                this.repetitions++
                (this.repetitions == this.nIntervals) ? this.emit('longBreak') : this.emit('shortBreak')
            }
        }, 1000)
    }
    stopTimer(){
        clearInterval(this.interval)
        console.log('Pedi pra parar, Parou')
        console.log(this.time)
    }
    resetTimer(){
        this.time = this.workTime
    }
    longBreak(){
        console.log('Pausa grande')
        this.repetitions = 0
        this.time = this.lbTime
        console.log(this.time)
        this.interval = setInterval(() => {
            this.time--

            if(this.time < 10 && this.time > 0){
                console.log(this.time)
            }

            if(this.time < 0){
                clearInterval(this.interval)
                console.log('Volte ao trabalho')
                this.emit('work')
            }
        }, 1000)
    }
    shortBreak(){
        console.log('Pausa Curta')
        this.time = this.sbTime
        this.interval = setInterval(() => {
            console.log(this.time)
            this.time--

            if(this.time < 0){
                clearInterval(this.interval)
                console.log('Volte ao trabalho')
                this.emit('work')
            }
        }, 1000)
    }
    configTimer(obj){
        try{
            const objJson = JSON.stringify(obj)
            fs.writeFileSync('./src/config.json', objJson)
        }catch (e){
            console.log(e)
        }
    }
    remainingTime(){
        console.log(this.time)
    }
}

module.exports = timer