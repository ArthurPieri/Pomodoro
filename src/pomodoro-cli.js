#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const Timer = require('./timer')

let timer = Timer
timer.construct()

program
    .version('0.0.1')
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
                    timer.configTimer(answers)
                    timer.workTime = answers.wtime
                    timer.lbTime = answers.lbtime
                    timer.sbTime = answers.sbtime
                    timer.nIntervals = answers.nIntervals
                    ask()
                })
                break
            case 'quit':
                console.log('Vazante')
                timer.stopTimer()
                break
            case 'ajuda':
                console.log('Para começar a usar seu pomodoro digite: start')
                ask()
                break
            case 'renegados':
                console.log('Aqui não há debiloides')
                ask()
                break
            default:
                console.log('Opção não reconhecida, tente uma das seguintes: \n'
                + '----------' + '----------' + '----------\n'
                + '| Start | ' + 'Stop   | '  + 'Reset     |\n'
                + '----------' + '----------' + '----------\n'
                + '| Long  | ' + 'Short  | '  + 'Config    |\n'
                + '----------' + '----------' + '----------\n'
                + '| Quit  | ' + 'Ajuda  | '  + 'Renegados |\n'
                + '----------' + '--------'   + '-----------' )
                ask()
            }
    })
}

ask()