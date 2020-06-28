const fs = require('fs')

class User {
    constructor(){
        let name = ''
        let password = ''
    }
    createUser(Name, Password){
        this.name = Name
        this.password = Password
        console.log(this)
    }
    saveUser(){
        let userObj = JSON.stringify({
            name: this.name,
            password: this.password
        })
        try{
            fs.appendFileSync('./user.json', userObj)
            console.log('User added')
            return
        }catch(e){
            console.log('Deu ruim\n', e)
        }
    }
}


let user = new User()

user.createUser("Jose", "4321")

console.log(user)

user.saveUser()

console.log('acabou')