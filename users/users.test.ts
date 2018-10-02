import 'jest'
import * as request from 'supertest'
import {Server} from '../server/server'
import {environment} from '../common/environment';
import {usersRouter} from '../users/users.router'
import {User} from './users.model'
import { response } from 'spdy';
let address: string
let server: Server
beforeAll(()=>{
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
    environment.server.port = process.env.SERVER_PORT || 3001
    address = `http://localhost:${environment.server.port}`
    server = new Server()
    server.bootstrap([usersRouter])
          .then(()=> User.remove({}).exec())  
          .catch(console.error)
})
test('get /users', ()=>{
    return request(address)
            .get('/users')
            .then(response=>{
                expect(response.status).toBe(200)
                expect(response.body.items).toBeInstanceOf(Array)
            }).catch(fail)
})

test('post /users', () => {
    return request(address)
             .post('/users')
             .send({
                name: 'usuario1',
                email: 'usuario1@email.com',
                password: '123456',
                cpf: '565.825.557-07'
             })
             .then(response => {
                expect(response.status).toBe(200)
                expect(response.body._id).toBeDefined()
                expect(response.body.name).toBe('usuario1')
                expect(response.body.email).toBe('usuario1@email.com')
                expect(response.body.cpf).toBe('565.825.557-07')
                expect(response.body.password).toBeUndefined()
             }).catch(fail)
})
// test.only // para executar somente o ele
// test.skip para pular o test
test('get /users/aaaaa - not found', () => {
    return request(address)
            .get('/users/aaaaa')
            .then(response => {
                expect(response.status).toBe(404)
            }).catch(fail)
})

test('patch /users/:id', () => {
    return request(address)
            .post('/users')
            .send({
                name: 'usuario2',
                email: 'usuario2@email.com',
                password: '123456'
            })
            .then(response => request(address)
                                     .patch(`/users/${response.body._id}`)
                                     .send({
                                         name: 'usuario2 - patch'
                                     }))
            .then(response => { 
                expect(response.status).toBe(200)
                expect(response.body._id).toBeDefined()
                expect(response.body.name).toBe('usuario2 - patch')
                expect(response.body.email).toBe('usuario2@email.com')
                expect(response.body.password).toBeUndefined()
            })                         
            .catch(fail)
})


afterAll(()=> {
    return server.shutdown()
})