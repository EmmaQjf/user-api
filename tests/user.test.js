const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const User = require('../models/user')
let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoServer.stop()
  server.close()
})

const user1 = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
user1.save()
const user2 = new User({ name: 'Jane Doe', email: 'jane.doe@example.com', password: 'password456' })
user2.save()
const user3 = new User({ name: 'Jack Doe', email: 'jack.doe@example.com', password: 'password789' })
user3.save()

describe('Test the users endpoints', () => {
  test('It should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('John Doe')
    expect(response.body.user.email).toEqual('john.doe@example.com')
    expect(response.body).toHaveProperty('token')
  })

  test('It should login a user', async () => {
    const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
    await user.save()

    const response = await request(app)
      .post('/users/login')
      .send({ email: 'john.doe@example.com', password: 'password123' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('John Doe')
    expect(response.body.user.email).toEqual('john.doe@example.com')
    expect(response.body).toHaveProperty('token')
  })

  test('It should update a user', async () => {
    const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
      .put(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Jane Doe', email: 'jane.doe@example.com' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('Jane Doe')
    expect(response.body.email).toEqual('jane.doe@example.com')
  })

  test('It should delete a user', async () => {
    const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
      .delete(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('User deleted')
  })

  test('It should list all the users', async () => {
  
    const response = await request(app).get('/users')
    expect(response.statusCode).toBe(200)
    expect(response.body[0].name).toEqual('John Doe')
    expect(response.body[1].name).toEqual('Jane Doe')
    expect(response.body[2].name).toEqual('Jack Doe')
  })
})