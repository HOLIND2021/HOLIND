const app = require('./app');
const request = require('supertest');

beforeAll(done => {
    done()
})

afterAll(done => {
    done()
})

describe('Patient Endpoints', () => {
    it('GET /patients should show all patients', async () => {
        const res = await request(app).get('/api/patients')
        expect(res.statusCode).toEqual(200)
        expect(res.body.body[0]).toHaveProperty('status')
        expect(res.body.body[0]).toHaveProperty('exercises')
    })
})

describe('User Endpoints', () => {
    it('GET /user/:uid should return specific user', async () => {
        const res = await request(app).get('/api/user/HY6tapp9GoRcBmEiS8LVYZENg4h1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.body.firstName).toEqual("Kevin")
        expect(res.body.body.lastName).toEqual("Lu")
    })

    const data = {
        uid: 'FgAaPkc3m5fP1SSmukEfzkL7OOk1',
        firstName: 'Test',
        lastName: 'User'
    }

    it('POST /createUser should create new user document', async () => {
        const res = await request(app).post('/api/createUser').send(data)
        expect(res.statusCode).toEqual(201)
        expect(res.body.body.firstName).toEqual("Test")
        expect(res.body.body.lastName).toEqual("User")
    })

    it('DELETE /deleteUser/:uid should delete specified user', async () => {
        const res = await request(app).delete('/api/deleteUser/'+data.uid)
        expect(res.statusCode).toEqual(204)
        const resFind = await request(app).get('/api/user/'+data.uid)
        expect(resFind.status).toEqual(404)
    })
})

describe('Invalid Endpoints', () => {
    it('GET /api/invalid-url should return msg `Catch All` with 200 status', async () => {
        const res = await request(app).get('/api/invalid-url')
        expect(res.statusCode).toEqual(200)
        expect(res.body.msg).toEqual('Catch All')
    })
})