const Timer = require('./model/timer.class')
const express = require('express')

const app = express()
app.use(express.json())

const timer = new Timer

// ---------------------------
// EVENT LISTENERS
// ---------------------------
timer.on('shortBreak', () => {
    timer.shortBreak()
})
timer.on('work', () => {
    timer.startTimer()
})
timer.on('longBreak', () => {
    timer.longBreak()
})

// ---------------------------
// ROUTES
// ---------------------------
app.get('/', (req, res) => {
    try{
        res.status(200).send(`Welcome to my Pomodoro`)
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/start', async(req, res) => {
    try{
        timer.startTimer()
        res.status(200).send('\nTrabalhe\n\n')    
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/stop', async(req, res) => {
    try{
        timer.stopTimer()
        res.status(200).send('Stopped')
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/short', async(req, res) => {
    try{
        timer.shortBreak()
        res.status(200).send('Short Break')
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/long', async(req, res) => {
    try{
        timer.longBreak()
        res.status(200).send('Long Break')
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/reset', async(req, res) => {
    try{
        timer.resetTimer()
        res.status(200).send('Restart')
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/config', async(req, res) => {
    try{
        console.log(req.body)
        timer.workTime = req.body.wtime
        timer.lbTime = req.body.lbtime
        timer.sbTime = req.body.sbtime
        timer.nIntervals = req.body.nIntervals
        res.status(200).send('Config saved')
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/config', async(req, res) => {
    try{
        let config = {
            workTime: timer.workTime,
            longBreak: timer.lbTime,
            shortBreak: timer.sbTime,
            nIntervals: timer.nIntervals
        }
        res.status(200).send(JSON.stringify(config))
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/time', async(req, res) => {
    try{
        await res.send(`\n${Math.floor(timer.time/60)}:${String((timer.time%60)).padStart(2, '0')}\n\n`)
    }catch(e){
        res.status(500)
    }
})

module.exports = app