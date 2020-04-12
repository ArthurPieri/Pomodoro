const request = require('supertest')
const app = require('../src/app')

describe('GET /', () => {
    it('Shoud return a welcome message', (done) => {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})

describe('POST /start', () => {
    it('Should start the timer', (done) => {
        request(app)
            .post('/start')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})

describe('POST /stop', () => {
    it('Should stop the timer', (done) => {
        request(app)
        .post('/stop')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
})

describe('POST /short', () => {
    it('Should start a short break', (done) => {
        request(app)
        .post('/short')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
})

describe('POST /long', () => {
    it('Should start a long break', (done) => {
        request(app)
        .post('/long')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
})

describe('POST /reset', () => {
    it('Should reset the timer', (done) => {
        request(app)
        .post('/reset')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
})

describe('POST /config', () => {
    it('Should set new config for each timer', (done) => {
        request(app)
        .post('/config')
        .set('Accept', 'application/json')
        .send({
            wtime:"25",
            lbtime:"20",
            sbtime:"5",
            nIntervals:"4"
        })
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
})

describe('GET /config', () => {
    it('Should return the current timer config', (done) => {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})

describe('GET /time', () => {
    it('Should return the remaining time in current timer', (done) => {
        request(app)
            .get('/time')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})