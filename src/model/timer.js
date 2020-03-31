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
            const configJSON = fs.readFileSync('config.json')
            const config = JSON.parse(configJSON)    
        
            this.time = ((config.worktime)*60)
            this.workTime = ((config.worktime)*60)
            this.lbTime = ((config.longbreak)*60)
            this.sbTime = ((config.shortbreak)*60)
        }catch(e){
            return []
        }
    },
    startTimer: async function (){
        console.log('Trabalhe')
        this.time = this.workTime
        this.interval = setInterval(() => {
            console.log(this.time)
            this.time--
        
            if(this.time < 0 ){        
                clearInterval(this.interval)
                console.log('Ding!')
                this.repetitions++
            }
        }, 1000)
    },
    stopTimer: async function (){
        clearInterval(this.interval)
        console.log('Parou')
    },
    resetTimer: function (){
        this.time = this.workTime
    },
    longBreak: async function (){
        console.log('Pausa grande')
        this.time = this.lbTime
        this.interval = setInterval(() => {
            console.log(this.time)
            this.time--

            if(this.time < 0){
                clearInterval(this.interval)
                console.log('Volte ao trabalho')
            }
        }, 1000)
    },
    shortBreak: async function (){
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
    configTimer: async function(obj){
        try{
            const objJson = JSON.stringify(obj)
            fs.writeFileSync('config.json', objJson)
        }catch (e){
            return []
        }
    }
}

module.exports = timer