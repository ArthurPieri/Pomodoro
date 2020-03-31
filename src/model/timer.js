let timer = {
    // Armazena a promessa do setInterval
    interval: {},
    // Utilizada para fazer a contagem regressiva
    time: 3,
    // Armazena quantos segundos a cada ciclo de trabalho
    workTime: 3,
    // Armazena quantos segundos de Pausa grande
    lbTime: 5,
    // Armazena quantos segundos de Pausa curta
    sbTime: 2,
    // Armazena quantas repetições aconteceram
    repetitions: 0,
    // Armazena quantos intervalos para rolar uma pausa grande
    nIntervals: 4,
    startTimer: function (){
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
    stopTimer: function (){
        clearInterval(this.interval)
        console.log('Parou')
    },
    resetTimer: function (){
        this.time = this.workTime
    },
    longBreak: function (){
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
    setWorkTime: function(minutes){
        this.workTime = (minutes * 60)
    },
    setLongBreak: function (minutes){
        this.lbTime = (minutes * 60)
    },
    setShortBreak: function (minutes){
        this.sbTime = (minutes * 60)
    }
}

module.exports = timer