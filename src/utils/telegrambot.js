const TeleBot = require('telebot');

const bot = new TeleBot(process.env.BOT_TOKEN);

module.exports = bot