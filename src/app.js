let Timer = require('./model/timer')
let yargs = require('yargs')
let vYargs = require('./yargsconfig/variables')

let timer = Timer
timer.construct()
//console.log(timer)

yargs.command({
    command: 'start',
    describe: 'Start the timer',
    handler: () => timer.startTimer()
})

yargs.command({
    command: 'reset',
    describe: 'Restart the timer',
    handler: () => timer.resetTimer()
})

yargs.command({
    command: 'longb',
    describe: 'Start a longbreak',
    handler: () => timer.longBreak
})

yargs.command({
    command: 'shortb',
    describe: 'Start a shortbreak',
    handler: ()=> timer.shortBreak
})

yargs.command({
    command: 'config',
    describe: 'Set the worktime',
    builder: {
        worktime: vYargs.WorkTime,
        longbreak: vYargs.LongBreakTime,
        shortbreak: vYargs.ShortBreakTime
    },
    handler: (argv) => timer.configTimer(argv)
})

yargs.parse()