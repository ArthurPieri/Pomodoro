#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const inquirer = require('inquirer')
const Timer = require('./model/timer.class')
const notifier = require('node-notifier')

let timer = new Timer

program
    .version('0.1.0')
    .parse(process.argv)

let questions = [
    {
        type: "input",
        name: "input",
        message: "Choose your option:",
    }
]

let config = [
    {
        type: "input",
        name: "wtime",
        message: "Set your work time"
    }, {
        type: "input",
        name: "lbtime",
        message: "Set the time for Long Break"
    }, {
        type: "input",
        name: "sbtime",
        message: "Set the time for Short break"
    }, {
        type: "input",
        name: "nIntervals",
        message: "Set the number of intervals before Longbreak"
    }
]

// Event Listeners
// @ts-ignore
timer.on('shortBreak', () => {
    notifier.notify({
        title: 'Pomodoro',
        message: 'Starting Short Break'
    })
    timer.shortBreak()
})
// @ts-ignore
timer.on('work', () => {
    notifier.notify({
        title: 'Pomodoro',
        message: 'Back to Work!'
    })
    timer.startTimer()
})
// @ts-ignore
timer.on('longBreak', () => {
    notifier.notify({
        title: 'Pomodoro',
        message: 'Enjoy your long Break'
    })
    timer.longBreak()
})

async function login(){
    await inquirer.prompt({
        type: "input",
        name: "username",
        message: "Username: ",
    }).then(async answers => {
        timer.username = answers.username
        
        if(!fs.existsSync('./src/db/config.json')){
            fs.writeFileSync('./src/db/config.json', '[]')
        }

        let result = timer.findUser(answers.username)

        if(result === null){
            await inquirer.prompt(config).then(answers => {
                let user = answers
                user.username = timer.username

                timer.addUser(user.username, user)
                // @ts-ignore
                timer.workTime = ((answers.wtime)*60)
                // @ts-ignore
                timer.lbTime = ((answers.lbtime)*60)
                // @ts-ignore
                timer.sbTime = ((answers.sbtime)*60)
                // @ts-ignore
                timer.nIntervals = ((answers.nIntervals)*60)
            })
        }
        
    }).then(() => {
        ask()
    })
}

function ask(){
    inquirer.prompt(questions)
    .then(answers => {
        // @ts-ignore
        switch(answers.input.toLowerCase()){
            case 'start':
                notifier.notify({
                    title: 'Pomodoro',
                    message: 'Begin you work'
                })
                timer.startTimer()
                ask()
                break
            case 'stop':
                notifier.notify({
                    title: 'Pomodoro',
                    message: 'Timer Stopped'
                })
                timer.stopTimer()
                ask()
                break
            case 'long':
                notifier.notify({
                    title: 'Pomodoro',
                    message: 'Enjoy your long Break'
                })
                timer.longBreak()
                ask()
                break
            case 'short':
                notifier.notify({
                    title: 'Pomodoro',
                    message: 'Quick Break'
                })
                timer.shortBreak()
                ask()
                break
            case 'reset':
                notifier.notify({
                    title: 'Pomodoro',
                    message: 'Timer reseted'
                })
                timer.resetTimer()
                ask()
                break
            case 'config':
                inquirer.prompt(config).then(answers => {
                    let user = answers
                    user.username = timer.username

                    timer.configTimer(user)
                    // @ts-ignore
                    timer.workTime = ((answers.wtime)*60)
                    // @ts-ignore
                    timer.lbTime = ((answers.lbtime)*60)
                    // @ts-ignore
                    timer.sbTime = ((answers.sbtime)*60)
                    // @ts-ignore
                    timer.nIntervals = ((answers.nIntervals)*60)
                    ask()
                })
                break
            case 'quit':
                notifier.notify({
                    title: 'Pomodoro',
                    message: 'Exiting pomodoro'
                })
                console.log('\nStopping Timer and quiting')
                timer.stopTimer()
                return
            case 'help':
                console.log('To start using your pomodoro type: start')
                ask()
                break
            case 'remaining':
                notifier.notify({
                    title: 'Pomodoro',
                    message: `Remaining time: ${Math.floor(timer.time/60)}:${String((timer.time%60)).padStart(2, '0')}`
                })
                timer.remainingTime()
                ask()
                break
            case 'r':
                notifier.notify({
                    title: 'Pomodoro',
                    message: `Remaining time: ${Math.floor(timer.time/60)}:${String((timer.time%60)).padStart(2, '0')}`,
                    wait: true
                })
                timer.remainingTime()
                ask()
                break
            default:
                console.log('Not recognized, Try the following: \n'
                + '----------' + '----------' + '----------\n'
                + '| Start | ' + 'Stop   | '  + 'Reset     |\n'
                + '----------' + '----------' + '----------\n'
                + '| Long  | ' + 'Short  | '  + 'Config    |\n'
                + '----------' + '----------' + '----------\n'
                + '| Quit  | ' + 'Help  | '  + 'Remaining |\n'
                + '----------' + '--------'   + '-----------' )
                ask()
            }
    })
}

login()