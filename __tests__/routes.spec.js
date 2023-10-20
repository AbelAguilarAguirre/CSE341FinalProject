const { MongoClient } = require('mongodb');
const env = require('dotenv');
env.config();
const request = require('supertest');
const baseURL = 'https://final-project-restaurant-api.onrender.com';

describe('insert', () => {
    let connection;
    let db;
    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('restaurant');
        console.log(db.body);
    })
    afterAll(async () => {
        await connection.close();
    })
    it("should return 200 for /menu", async () => {
        const response = await request(baseURL).get("/menu");
        expect(response.statusCode).toBe(200);
    });
    it("should return 200 for /employees", async () => {
        const response = await request(baseURL).get("/employees");
        expect(response.statusCode).toBe(200);
    });
    it("should return 200 for /reservations", async () => {
        const response = await request(baseURL).get("/reservations");
        expect(response.statusCode).toBe(200);
    });
    it("should return 200 for /inventory", async () => {
        const response = await request(baseURL).get("/inventory");
        expect(response.statusCode).toBe(200);
    });
    
});