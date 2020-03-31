let timer = require('./model/timer')

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