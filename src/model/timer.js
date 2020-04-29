const mongoose = require('mongoose')
const sEvents = require('../utils/sharedEvents')
const bot = require('../utils/telegrambot')

const timerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    chatId:{
        type: Number,
        required: true,
        unique: true
    },
    interval:{
        type: Object
    },
    time:{
        type: Number
    },
    workTime:{
        type: Number,
        default: 1500
    },
    lbTime:{
        type: Number,
        default: 1200
    },
    sbTime:{
        type: Number,
        default: 300
    },
    repetitions:{
        type: Number,
        default: 0
    },
    nIntervals:{
        type: Number,
        default: 4
    },
    opt:{
        type: String
    }
})

timerSchema.methods.startTime = function (){
    clearInterval(this.interval)
    let humanTimer = Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')
    this.time = this.workTime
    this.opt = 'work'

    bot.sendMessage(this.chatId, `${humanTimer}`)

    this.interval = setInterval(() => {
        this.time--

        if(this.time < 6 && this.time > 0){
            bot.sendMessage(this.chatId, `${humanTimer}`)
        }

        if(this.time < 0){
            clearInterval(this.interval)
            bot.sendMessage(this.chatId, 'DING!')
            this.repetitions++
            if(this.repetitions <= this.nIntervals){
                sEvents.emit('shortBreak')
            }else {
                this.repetitions = 0
                sEvents.emit('longBreak')
            }
        }

    },1000)
}

timerSchema.methods.stopTimer = function (){
    clearInterval(this.interval)
    bot.sendMessage(this.chatId, `Timer Stoped! Remaining: ${Math.floor(this.time/60)}:${this.time%60}`)
}

timerSchema.methods.longBreak = function () {

}

const Timer = mongoose.model(`Timer`, timerSchema)

module.exports = Timer