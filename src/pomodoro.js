const moment = require('moment-timezone')
const TelegramBot = require('telebot')
const token = process.env.BOT_TOKEN
const express = require('express')

let tArray = []
let removeArray = []

const bot = new TelegramBot(token)
const app = express()
const port = process.env.PORT || 4200
moment.tz.setDefault('America/Sao_Paulo')


app.get('/', (req, res) => {
    res.render('Home', {
        title: 'Pomodoro',
        name: 'by: Arthur Pieri'
    })
})

console.log(moment())

// Keyboard
bot.on(['/hello'], (msg) => {
    let replyMarkup = bot.keyboard([
        ['/work', '/stop',`/hide`],
        ['/short', '/long', '/help']
    ], {resize: true})    
    return bot.sendMessage(msg.from.id, `Hello ${msg.from.first_name} welcome!`, {replyMarkup});    
})

bot.on(['/buttons', '/back', `/start`], msg => {
    let replyMarkup = bot.keyboard([
        ['/work', '/stop',`/hide`],
        ['/short', '/long', '/help']
    ], {resize: true})

    return bot.sendMessage(msg.from.id, 'Here are some options.', {replyMarkup});
})

bot.on('/help', msg => {
    let replyMarkup = bot.keyboard([
        ['/work', '/stop',`/hide`],
        ['/short', '/long', '/help']
    ], {resize: true})    
    bot.sendMessage(msg.from.id, `  Hello ${msg.from.first_name} welcome! 
    This bot was created to be a Pomodoro timer.
    If you want to Learn more access: https://arthurpieri.com/pomodoro`, {replyMarkup});
})

bot.on('/hide', msg => {
    return bot.sendMessage(
        msg.from.id, 'Keyboard hidden. Type /back to show.', {replyMarkup: 'hide'}
    )
})

// Actual functions
bot.on('/work', msg => {
    let exists
    tArray.find( element => {
        element.tkey === msg.from.id
        exists = tArray.indexOf(element)
    })
    if(exists >= 0){
        tArray[exists] = {
            username: msg.from.username,
            name: msg.from.first_name,
            tkey: msg.from.id,
            date: moment().add(25, 'minutes').calendar()
        }        
    }else {
        tArray.push({
            username: msg.from.username,
            name: msg.from.first_name,
            tkey: msg.from.id,
            date: moment().add(25, 'minutes').calendar()
        })
    }

    msg.reply.text(`Hi ${msg.from.first_name}! Start your 25 minutes of Work! \n Your timer will end at: ${moment().add(25, 'minutes').calendar()} (UTC-03:00)`)
    exists = false
})

bot.on(`/stop`, msg => {
    let stopped
    tArray.find( element => {
        element.tkey === msg.from.id
        stopped = tArray.indexOf(element)
        msg.reply.text(`${msg.from.first_name} timer stoped. Remember to keep on going!`)
    })
    tArray.pop(stopped)
    stopped = undefined
})

bot.on('/short', msg => {
    let exists
    tArray.find( element => {
        element.tkey === msg.from.id
        exists = tArray.indexOf(element)
    })
    if(exists >= 0){
        tArray[exists] = {
            username: msg.from.username,
            name: msg.from.first_name,
            tkey: msg.from.id,
            date: moment().add(5, 'minutes').calendar()
        }        
    }else {
        tArray.push({
            username: msg.from.username,
            name: msg.from.first_name,
            tkey: msg.from.id,
            date: moment().add(5, 'minutes').calendar()
        })
    }

    msg.reply.text(`Hi ${msg.from.first_name}! Start your 5 minutes rest! \n Your timer will end at: ${moment().add(5, 'minutes').calendar()} (UTC-03:00)`)
    exists = false
})

bot.on('/long', msg => {
    let exists
    tArray.find( element => {
        element.tkey === msg.from.id
        exists = tArray.indexOf(element)
    })
    if(exists >= 0){
        tArray[exists] = {
            username: msg.from.username,
            name: msg.from.first_name,
            tkey: msg.from.id,
            date: moment().add(15, 'minutes').calendar()
        }        
    }else {
        tArray.push({
            username: msg.from.username,
            name: msg.from.first_name,
            tkey: msg.from.id,
            date: moment().add(5, 'minutes').calendar()
        })
    }

    msg.reply.text(`Hi ${msg.from.first_name}! Start your 15 minutes long rest! \n Your timer will end at: ${moment().add(15, 'minutes').calendar()} (UTC-03:00)`)
    exists = false
})

setInterval(() => {
    tArray.forEach(element => {
        if(moment().calendar() == element.date){
            bot.sendMessage(element.tkey, `Hey ${element.name} Times up!`)
            removeArray.push(tArray.indexOf(element))
        }        
    });
    removeArray.forEach(element => {
        tArray.pop(element)
    })
    removeArray = []
},5000)

bot.start()

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})