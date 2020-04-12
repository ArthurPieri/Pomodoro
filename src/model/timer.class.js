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
        let opt = ''
        try{
            const configJSON = fs.readFileSync('./src/db/config.json')
            const config = JSON.parse(configJSON)

            this.time = ((config.wtime)*60)
            this.workTime = ((config.wtime)*60)
            this.lbTime = ((config.lbtime)*60)
            this.sbTime = ((config.sbtime)*60)
            this.nIntervals = ((config.nIntervals)*1)
            this.repetitions = 0
        }catch(e){
            return e
        }
    }
    startTimer(){
        clearInterval(this.interval)
        this.time = this.workTime
        this.opt = 'Work'

        console.log(`${Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')} \n`)

        this.interval = setInterval(() => {
            this.time--

            if(this.time < 6 && this.time > 0){
                console.log(this.time)
            }

            if(this.time < 0 ){
                clearInterval(this.interval)
                console.log('Ding!')
                this.repetitions++
                if (this.repetitions <= this.nIntervals){
                    this.emit('shortBreak')
                }else {
                    this.repetitions = 0
                    this.emit('longBreak')
                }
            }
        }, 1000)
    }
    stopTimer(){
        clearInterval(this.interval)
        console.log(`Remaining time: ${Math.floor(this.time/60)}:${this.time%60}`)
    }
    resetTimer(){
        this.time = this.workTime
    }
    longBreak(){
        clearInterval(this.interval)
        console.log(`${Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')}`)
        this.repetitions = 0
        this.opt = 'Long Break'
        this.time = this.lbTime
        this.interval = setInterval(() => {
            this.time--

            this.showBreakTimer()
        }, 1000)
    }
    shortBreak(){
        clearInterval(this.interval)
        this.opt = 'Short Break'
        this.time = this.sbTime
        this.interval = setInterval(() => {
            this.time--

            this.showBreakTimer()
            
        }, 1000)
    }
    configTimer(obj){
        try{
            const objJson = JSON.stringify(obj)
            fs.writeFileSync('./src/db/config.json', objJson)
            fs.closeFileSync('./src/db/config.json')
        }catch (e){
            console.log(e)
        }
    }
    showBreakTimer(){
        if(this.time < 6 && this.time > 0){
            console.log(this.time)
        }

        if(this.time < 0){
            clearInterval(this.interval)
            this.emit('work')
        }
    }
}

module.exports = timer