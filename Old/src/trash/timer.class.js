const Emitter = require('events')
const fs = require('fs')

class timer extends Emitter {
    constructor(){
        super()
        let username = ''
        let interval = {}
        let time = (25*60)
        let workTime = (25*60)
        let lbTime = (20*60)
        let sbTime = (5*60)
        let repetitions = 0
        let nIntervals = 4
        let opt = ''
        try{
            if(fs.existsSync('./src/db/config.json')){
                const configJSON = fs.readFileSync('./src/db/config.json')
                const config = JSON.parse(configJSON)
    
                this.username = config.username
                this.time = ((config.wtime))
                this.workTime = ((config.wtime))
                this.lbTime = ((config.lbtime))
                this.sbTime = ((config.sbtime))
                this.nIntervals = ((config.nIntervals)*1)
                this.repetitions = 0    
            }
        }catch(e){
            console.log(e)
        }
    }
    _saveUser(user){
        try{
            const userJSON = JSON.stringify(user)
            fs.writeFileSync('./src/db/config.json', userJSON)    
        }catch(e){
            return e
        }
    }
    _loadUsers(){
        try{
            const userBuffer = fs.readFileSync('./src/db/config.json')
            const userJSON = userBuffer.toString()
            return JSON.parse(userJSON)
        }catch(e){
            return
        }
    }
    findUser(username){
        const users = this._loadUsers()
        const isUser = users.find((user) => user.username === username)

        if(isUser){
            this.username = isUser.username
            this.time = isUser.time
            this.workTime = isUser.workTime
            this.lbTime = isUser.lbTime
            this.sbTime = isUser.sbTime
            this.nIntervals = isUser.nIntervals
            this.repetitions = 0
        }else{
            return null
        }
    }
    addUser(username, config){
        const users = this._loadUsers()
        const duplicatedUsers = users.find((user) => user.username === username)

        if(!duplicatedUsers){
            users.push({
                username,
                time: ((config.wtime)*60),
                workTime: ((config.wtime)*60),
                lbTime: ((config.lbtime)*60),
                sbTime: ((config.sbtime)*60),
                nIntervals: ((config.nIntervals)*1),
            })
            this._saveUser(users)
            console.log('New user added')
        }else{
            console.log('User already exists')
        }
    }
    startTimer(){
        clearInterval(this.interval)
        this.time = this.workTime
        this.opt = 'Work'

        console.log(`${Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')} \n`)

        this.interval = setInterval(() => {
            this.time--

            if(this.time < 6 && this.time > 0){
                console.log(this.time)
            }

            if(this.time < 0 ){
                clearInterval(this.interval)
                console.log('Ding!')
                this.repetitions++
                if (this.repetitions <= this.nIntervals){
                    this.emit('shortBreak')
                }else {
                    this.repetitions = 0
                    this.emit('longBreak')
                }
            }
        }, 1000)
    }
    stopTimer(){
        clearInterval(this.interval)
        console.log(`Remaining time: ${Math.floor(this.time/60)}:${this.time%60}`)
    }
    resetTimer(){
        this.time = this.workTime
    }
    longBreak(){
        clearInterval(this.interval)
        console.log(`${Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')}`)
        this.repetitions = 0
        this.opt = 'Long Break'
        this.time = this.lbTime
        this.interval = setInterval(() => {
            this.time--

            this._showBreakTimer()
        }, 1000)
    }
    shortBreak(){
        clearInterval(this.interval)
        this.opt = 'Short Break'
        this.time = this.sbTime
        this.interval = setInterval(() => {
            this.time--

            this._showBreakTimer()
            
        }, 1000)
    }
    configTimer(obj){
        try{
            const objJson = JSON.stringify(obj)
            fs.writeFileSync('./src/db/config.json', objJson)
            fs.closeFileSync('./src/db/config.json')
        }catch (e){
            console.log(e)
        }
    }
    _showBreakTimer(){
        if(this.time < 6 && this.time > 0){
            console.log(this.time)
        }

        if(this.time < 0){
            clearInterval(this.interval)
            this.emit('work')
        }
    }
}

module.exports = timer