const Emitter = require('events')
const fs = require('fs')

// @ts-ignore
class timer extends Emitter {
    constructor(){
        super()
        // @ts-ignore
        let username = ''
        // @ts-ignore
        let interval = {}
        // @ts-ignore
        let time = (25*60)
        // @ts-ignore
        let workTime = (25*60)
        // @ts-ignore
        let lbTime = (25*20)
        // @ts-ignore
        let sbTime = (5*60)
        // @ts-ignore
        let repetitions = 0
        // @ts-ignore
        let nIntervals = 4
        // @ts-ignore
        let opt = ''
        try{
            if(fs.existsSync('./src/db/config.json')){
                const configJSON = fs.readFileSync('./src/db/config.json')
                // @ts-ignore
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
    // @ts-ignore
    _saveUser(user){
        try{
            const userJSON = JSON.stringify(user)
            fs.writeFileSync('./src/db/config.json', userJSON)    
        }catch(e){
            console.log(e)
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
    // @ts-ignore
    findUser(username){
        const users = this._loadUsers()
        // @ts-ignore
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
    // @ts-ignore
    addUser(username, config){
        const users = this._loadUsers()
        // @ts-ignore
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
        // @ts-ignore
        clearInterval(this.interval)
        console.log('\n --------------')
        console.log('Start working')
        console.log('--------------\n')
        this.time = this.workTime
        this.opt = 'Work'

        console.log(`${Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')} \n`)

        this.interval = setInterval(() => {
            this.time--

            if(this.time < 6 && this.time > 0){
                console.log(this.time)
            }

            if(this.time < 0 ){
                // @ts-ignore
                clearInterval(this.interval)
                console.log('Ding!')
                this.repetitions++
                if (this.repetitions <= this.nIntervals){
                    // @ts-ignore
                    this.emit('shortBreak')
                }else {
                    this.repetitions = 0
                    // @ts-ignore
                    this.emit('longBreak')
                }
            }
        }, 1000)
    }
    stopTimer(){
        // @ts-ignore
        clearInterval(this.interval)
        console.log('\n --------------')
        console.log('Stop!')
        console.log(`Remaining Time: ${Math.floor(this.time/60)}:${this.time%60}`)
        console.log('--------------\n')
    }
    resetTimer(){
        this.time = this.workTime
    }
    longBreak(){
        // @ts-ignore
        clearInterval(this.interval)
        this.opt = 'Long Break'
        console.log('\n --------------')
        console.log('Long Break')
        console.log('--------------\n')
        console.log(`${Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')}`)
        this.repetitions = 0
        this.time = this.lbTime
        this.interval = setInterval(() => {
            this.time--

            this._showBreakTimer()
        }, 1000)
    }
    shortBreak(){
        // @ts-ignore
        clearInterval(this.interval)
        this.opt = 'Short Break'
        console.log('\n --------------')
        console.log('Short Break')
        console.log('--------------\n')
        this.time = this.sbTime
        this.interval = setInterval(() => {
            this.time--

            this._showBreakTimer()
            
        }, 1000)
    }
    // @ts-ignore
    configTimer(obj){
        try{
            const objJson = JSON.stringify(obj)
            fs.writeFileSync('./src/db/config.json', objJson)
        }catch (e){
            console.log(e)
        }
    }
    remainingTime(){
        console.log('\n --------------')
        console.log(this.opt)
        console.log(`${Math.floor(this.time/60)}:${String((this.time%60)).padStart(2, '0')}`)
        console.log('--------------\n')
    }
    _showBreakTimer(){
        if(this.time < 6 && this.time > 0){
            console.log(this.time)
        }

        if(this.time < 0){
            // @ts-ignore
            clearInterval(this.interval)
            console.log('\n --------------')
            console.log('Back to Work')
            console.log('-------------- \n')
            // @ts-ignore
            this.emit('work')
        }
    }
}

module.exports = timer