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
            const configJSON = fs.readFileSync('./src/config/config.json')
            const config = JSON.parse(configJSON)

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
        console.log('\n --------------')
        console.log('Comece a trabalhar')
        console.log('--------------\n')
        this.time = this.workTime
        this.opt = 'st'

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
        console.log('\n --------------')
        console.log('Pedi pra parar, Parou')
        console.log(`Tempo restante: ${Math.floor(this.time/60)}:${this.time%60}`)
        console.log('--------------\n')
    }
    resetTimer(){
        this.time = this.workTime
    }
    longBreak(){
        console.log('\n --------------')
        console.log('Pausa grande')
        console.log('--------------\n')
        console.log(`${Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')}`)
        this.repetitions = 0
        this.time = this.lbTime
        this.interval = setInterval(() => {
            this.time--

            this.showBreakTimer()
        }, 1000)
    }
    shortBreak(){
        console.log('\n --------------')
        console.log('Pausa Curta')
        console.log('--------------\n')
        console.log(`${Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')}`)
        this.time = this.sbTime
        this.interval = setInterval(() => {
            this.time--

            this.showBreakTimer()
            
        }, 1000)
    }
    configTimer(obj){
        try{
            const objJson = JSON.stringify(obj)
            fs.writeFileSync('./src/config/config.json', objJson)
        }catch (e){
            console.log(e)
        }
    }
    remainingTime(){
        console.log('\n --------------')
        console.log(`${Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')}`)
        console.log('--------------\n')
    }
    showBreakTimer(){
        if(this.time < 6 && this.time > 0){
            console.log(this.time)
        }

        if(this.time < 0){
            clearInterval(this.interval)
            console.log('\n --------------')
            console.log('Volte ao trabalho')
            console.log('-------------- \n')
            this.emit('work')
        }
    }
}

module.exports = timer