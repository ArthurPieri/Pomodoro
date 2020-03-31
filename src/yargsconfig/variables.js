const WorkTime = {
    describe: 'Define the time for the WorkTime',
    demandOption: true,
    alias: 'w',
    type: 'number',
}

const LongBreakTime = {
    describe: 'Define the time for the Long Break Time',
    demandOption: true,
    alias: 'l',
    type: 'number',
}

const ShortBreakTime = {
    describe: 'Define the time for the Short Break Time',
    demandOption: true,
    alias: 's',
    type: 'number',
}

const Repetitions = {
    describe: 'Define the number of repetitions before a longbreak',
    demandOption: true,
    alias: 'r',
    type: 'number',
}

module.exports = {
    WorkTime,
    LongBreakTime,
    ShortBreakTime,
    Repetitions
}