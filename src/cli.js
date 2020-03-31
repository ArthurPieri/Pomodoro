const program = require('commander')

program
    .version('0.0.1')
    .option('-l, --list [list]', 'list of commands')
    .parse(process.argv)

let questions = [
    {
        type: "input",
        name: ""
    },
    {

    },
]

console.log(program.list)