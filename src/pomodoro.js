const bot = require('./utils/telegrambot')
const Timer = require('./model/timer.model')

let timer = new Timer

console.log(timer)

/*
start - Start your pomodoro timer
stop - Stop the tmer
short - Start a short Break
long - Start a Long Break
reset - Restart the current timer
config - Set the timers for each cycle of work, short break, long break and the number of repetitions
help - Get some Help on how to use the bot or what is the Pomodoro Technique
*/

bot.on(`/start`, msg => {
    let replyMarkup = bot.keyboard([
        ['/stop', '/short',`/long`],
        ['/reset', '/conig', '/help']
    ], {resize: true})

    return bot.sendMessage(msg.from.id, 'Keyboard example.', {replyMarkup});
})

// On commands
// bot.on(['/start', '/back'], msg => {
//     let replyMarkup = bot.keyboard([
//         ['/buttons', '/inlineKeyboard',`/testinho`],
//         ['/start', '/hide', '/testao']
//     ], {resize: true});
//     return bot.sendMessage(msg.from.id, 'Keyboard example.', {replyMarkup});
// });

// Buttons
bot.on('/buttons', msg => {

    let replyMarkup = bot.keyboard([
        [bot.button('contact', 'Your contact'), bot.button('location', 'Your location')],
        ['/back', '/hide']
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Button example.', {replyMarkup});

});

// Hide keyboard
bot.on('/hide', msg => {
    return bot.sendMessage(
        msg.from.id, 'Hide keyboard example. Type /back to show.', {replyMarkup: 'hide'}
    );
});

// On location on contact message
bot.on(['location', 'contact'], (msg, self) => {
    return bot.sendMessage(msg.from.id, `Thank you for ${ self.type }.`);
});

// Inline buttons
bot.on('/inlineKeyboard', msg => {

    let replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('callback', {callback: 'this_is_data'}),
            bot.inlineButton('inline', {inline: 'some query'})
        ], [
            bot.inlineButton('url', {url: 'https://telegram.org'})
        ]
    ]);

    return bot.sendMessage(msg.from.id, 'Inline keyboard example.', {replyMarkup});

});

// Inline button callback
bot.on('callbackQuery', msg => {
    // User message alert
    return bot.answerCallbackQuery(msg.id, `Inline button callback: ${ msg.data }`, true);
});

// Inline query
bot.on('inlineQuery', msg => {

    const query = msg.query;
    const answers = bot.answerList(msg.id);

    answers.addArticle({
        id: 'query',
        title: 'Inline Query',
        description: `Your query: ${ query }`,
        message_text: 'Click!'
    });

    return bot.answerQuery(answers);

});

bot.start();
