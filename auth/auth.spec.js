const request = require('supertest');
const db = require('../database/dbConfig.js');
const api = require('./authModel.js');
const bc = require('bcrypt')
const server = require('../api/server.js');

describe('apiRouter tests', () => {
    describe('check for testing environment', () => {
        it('should run in testing environment', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    describe('add user', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })
    
        it('add a user', async () => {
            await api.add({ username: "Timothy", password: "tim" });
    
            const users = await db('users');
    
            expect(users).toHaveLength(1);
        })

        it('register returns 201', async (done) => {

            request(server)
                .post('/api/auth/register')
                .send({ username: "Timothy", password: "tim" })
                .expect(201)
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('login returns json', async (done) => {
            await api.add({ username: "Timothy", password: "tim" });

            request(server)
                .post('/api/auth/login')
                .send({ username: "Timothy", password: "tim" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('login returns 201', async (done) => {
            await api.add({ username: "Timothy", password: bc.hashSync("tim", 10) });

            request(server)
                .post('/api/auth/login')
                .send({ username: "Timothy", password: "tim" })
                .expect(201)
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })
    })
})