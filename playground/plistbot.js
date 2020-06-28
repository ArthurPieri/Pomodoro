// Vou comentar aqui para facilitar na hora de fazer a separação de arquivos e responsabilidades
// Declarações
const moment = require('moment')
const fs = require('fs')
const TelegramBot = require('telebot')
const token = process.env.BOT_TOKEN

let tArray = []

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

bot.on('/start', (msg) => {
    tArray.push({
        username: msg.from.username,
        name: msg.from.first_name,
        tkey: msg.from.id,
        date: moment().add(1, 'minutes').calendar()
    })
    msg.reply.text('Start working!')
})

// Esse intervalo vai verificar quando enviar a mensagem
setInterval(() => {
    tArray.forEach(element => {
        if(moment().calendar() == element.date){
            bot.sendMessage(element.tkey, `Hey ${element.name} Times up!`)
            tArray.pop(tArray.indexOf(element))
            return
        }        
    });
    // colocar aqui o bot.sendMessage() para avisar a pessoa quando acaba o timer
},1000)

bot.start()