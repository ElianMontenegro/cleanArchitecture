import request from 'supertest'
import app from '../config/app'

describe('bodyParse', () => {
    test('Should Body Parser',async () => {
        app.post('/body_parser', (req, res) => {
            res.send({ name: 'any_name' })
        })
        await request(app)
            .post('/body_parser')
            .expect({ name: 'any_name' })
    })
    
})
