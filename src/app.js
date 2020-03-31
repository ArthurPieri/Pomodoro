let Timer = require('./model/timer')
let yargs = require('yargs')

let timer = Timer

const yargsTime = {
    describe: 'Define the time for the function',
    demandOption: true,
    type: 'number',
    alias: 't'
}

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
    command: 'setwt',
    describe: 'Set the worktime',
    builder: {
        time: yargsTime
    },
    handler: (argv) => timer.setWorkTime(argv.time) 
})

yargs.parse()