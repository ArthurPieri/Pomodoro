const moment = require(`moment`)

let hArray = []

for(i= 0; i<10; i++){
    hArray.push(`${moment().add(i+10, 'second').calendar()}`)
}

let date = moment().add(30, 'seconds').calendar()

let test = {
    date,
    index: hArray.findIndex(element => element === date)
}

console.log('Hora: ',date)
console.log(`------------------`)
console.log(moment().calendar())
console.log(`------------------`)


hArray.forEach(element => {
    if(element == moment().calendar()){
        console.log('achei')
    }
});

// setInterval(() => {

// }, 10000)