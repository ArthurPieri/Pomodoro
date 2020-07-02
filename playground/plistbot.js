// Vou comentar aqui para facilitar na hora de fazer a separação de arquivos e responsabilidades
// Declarações
const moment = require('moment')
const fs = require('fs')
const TelegramBot = require('telebot')
const token = process.env.BOT_TOKEN

let tArray = []
let removeArray = []
let stoppedArray = []

// Criando o bot para usar depois
const bot = new TelegramBot(token)

// Declarações dos botões do teclado do bot que serão usados
bot.on(['/hello'], (msg) => msg.reply.text('Welcome!'));

bot.on(['/buttons', '/back'], msg => {
    let replyMarkup = bot.keyboard([
        ['/start', '/short',`/long`],
        ['/stop', '/config', '/help']
    ], {resize: true})

    return bot.sendMessage(msg.from.id, 'Here is some options.', {replyMarkup});
})

bot.on('/hide', msg => {
    return bot.sendMessage(
        msg.from.id, 'Keyboard hidden. Type /back to show.', {replyMarkup: 'hide'}
    )
})

bot.on('/start', msg => {
    tArray.push({
        username: msg.from.username,
        name: msg.from.first_name,
        tkey: msg.from.id,
        date: moment().add(25, 'minutes').calendar()
    })
    msg.reply.text(`Hi ${msg.from.first_name}! Start your 25 minutes of Work!`)
})

bot.on(`/stop`, msg => {
    tArray.forEach(element => {
        if(msg.from.id === element.tkey){
            msg.reply.text(`${msg.from.first_name} timer stoped. Remember to keep on going!`)
            stoppedArray.push(tArray.indexOf(element))
        }  
    })
    removeArray.forEach(element => {
        tArray.pop(element)
    })
    removeArray = []
})

// Esse intervalo vai verificar quando enviar a mensagem
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