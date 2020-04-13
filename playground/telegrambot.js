let TelegramBot = require('node-telegram-bot-api')

let token = process.env.BOT_TOKEN

telegram = new TelegramBot(token , {polling: true})

telegram.on("text", (message) => {
    telegram.sendMessage(message.chat.id, "Hello World")
})