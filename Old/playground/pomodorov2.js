#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const inquirer = require('inquirer')
const Timer = require('./model/timer.class')

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
timer.on('shortBreak', () => {
    timer.shortBreak()
})
timer.on('work', () => {
    timer.startTimer()
})
timer.on('longBreak', () => {
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
                timer.workTime = ((answers.wtime)*60)
                timer.lbTime = ((answers.lbtime)*60)
                timer.sbTime = ((answers.sbtime)*60)
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
        switch(answers.input.toLowerCase()){
            case 'start':
                timer.startTimer()
                ask()
                break
            case 'stop':
                timer.stopTimer()
                ask()
                break
            case 'long':
                timer.longBreak()
                ask()
                break
            case 'short':
                timer.shortBreak()
                ask()
                break
            case 'reset':
                timer.resetTimer()
                ask()
                break
            case 'config':
                inquirer.prompt(config).then(answers => {
                    let user = answers
                    user.username = timer.username

                    timer.configTimer(user)
                    timer.workTime = ((answers.wtime)*60)
                    timer.lbTime = ((answers.lbtime)*60)
                    timer.sbTime = ((answers.sbtime)*60)
                    timer.nIntervals = ((answers.nIntervals)*60)
                    ask()
                })
                break
            case 'quit':
                console.log('\nStopping Timer and quiting')
                timer.stopTimer()
                return
            case 'help':
                console.log('To start using your pomodoro type: start')
                ask()
                break
            case 'remaining':
                timer.remainingTime()
                ask()
                break
            case 'r':
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