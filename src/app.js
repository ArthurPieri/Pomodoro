const Timer = require('./model/timer.class')
require('./db/mongoose')
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
    let welcome = {
        message: 'Welcome to my Pomodoro'
    }
    try{
        res.json(welcome)
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/start', async(req, res) => {
    try{
        timer.startTimer()
        res.json({message: 'Start working'})    
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/stop', async(req, res) => {
    try{
        timer.stopTimer()
        res.json({message: 'Stopped'})
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/short', async(req, res) => {
    try{
        timer.shortBreak()
        res.json({message: 'Short Break'})
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/long', async(req, res) => {
    try{
        timer.longBreak()
        res.json({message: 'Long Break'})
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/reset', async(req, res) => {
    try{
        timer.resetTimer()
        res.json({message: 'Restart'})
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/config', async(req, res) => {
    try{
        console.log(req.body)
        timer.workTime = (req.body.wtime)*60
        timer.lbTime = (req.body.lbtime)*60
        timer.sbTime = (req.body.sbtime)*60
        timer.nIntervals = req.body.nIntervals
        res.json({message: 'Config saved',
                config: req.body})
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/help', (req, res) => {
    try{
        let options = ['Start', 'Stop', 'Reset', 'Long', 'Short', 'Config', 'Time']
        res.json({message: options})
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
        res.json(config)
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/time', async(req, res) => {
    try{
        await res.json({
                        message: `${Math.floor(timer.time/60)}:${String((timer.time%60)).padStart(2, '0')}`,
                        option: timer.opt})
    }catch(e){
        res.status(500)
    }
})

module.exports = app