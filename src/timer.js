const fs = require('fs')

let timer = {
    // Armazena a promessa do setInterval
    interval: {},
    // Utilizada para fazer a contagem regressiva
    time: (25*60),
    // Armazena quantos segundos a cada ciclo de trabalho
    workTime: (25*60),
    // Armazena quantos segundos de Pausa grande
    lbTime: (25*20),
    // Armazena quantos segundos de Pausa curta
    sbTime: (5*60),
    // Armazena quantas repetições aconteceram
    repetitions: 0,
    // Armazena quantos intervalos para rolar uma pausa grande
    nIntervals: 4,
    construct: function () {
        try{
            const configJSON = fs.readFileSync('./src/config.json')
            const config = JSON.parse(configJSON)

            console.log

            this.time = ((config.wtime)*60)
            this.workTime = ((config.wtime)*60)
            this.lbTime = ((config.lbtime)*60)
            this.sbTime = ((config.sbtime)*60)
            this.nIntervals = config.nIntervals
        }catch(e){
            console.log(e)
        }
    },
    startTimer: function (){
        console.log('Trabalhe')
        this.time = this.workTime
        
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
            }
        }, 1000)
    },
    stopTimer: function (){
        clearInterval(this.interval)
        console.log('Pedir pra parar, Parou')
    },
    resetTimer: function (){
        this.time = this.workTime
    },
    longBreak: function (){
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
            }
        }, 1000)
    },
    shortBreak: function (){
        console.log('Pausa Curta')
        this.time = this.sbTime
        this.interval = setInterval(() => {
            console.log(this.time)
            this.time--

            if(this.time < 0){
                clearInterval(this.interval)
                console.log('Volte ao trabalho')
            }
        }, 1000)
    },
    configTimer: function(obj){
        try{
            const objJson = JSON.stringify(obj)
            fs.writeFileSync('./src/config.json', objJson)
        }catch (e){
            console.log(e)
        }
    }
}

module.exports = timer