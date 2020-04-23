const TelegramBot = require('node-telegram-bot-api');
const Emitter = require(`events`)

const event = new Emitter

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
let chatId = bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
  return chatId

});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

console.log(chatId)

setTimeout(() => {
    event.emit('Teste')
    console.log('Teste')
    console.log(chatId)
},5000)

bot.on(`teste`, (chatId) => [
    bot.sendMessage(chatId, 'Emitter test')
])
