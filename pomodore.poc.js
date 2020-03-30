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
                console.log(this.repetitions)
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
    setWorkTime: function(time){
        this.workTime = time
    },
    setLongBreak: function (time){
        this.lbTime = time
    },
    setShortBreak: function (time){
        this.sbTime = time
    }
}

let timerArthur = timer

timerArthur.startTimer()
setTimeout(() => {
    timerArthur.stopTimer()
    console.log(timerArthur.time)
}, 3000);
setTimeout(() => {
    timerArthur.resetTimer()
    console.log(timerArthur.time)
    timerArthur.longBreak()
}, 3500)
setTimeout(() => {
    timerArthur.shortBreak()
},12000 )