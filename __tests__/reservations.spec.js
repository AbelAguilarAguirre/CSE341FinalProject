const { MongoClient } = require('mongodb');

describe('Handlers', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(globalThis.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
    });

    test('get all', async () => {
        const reservations = db.collection('reservations');
        const mockReservation = { _id: '1', date: '10/10/23', time: '9pm', party: '2', name: 'John Doe', phone: '123-456-7890', email: 'email@email.com', notes: ''}
        await reservations.insertOne(mockReservation);

        const result = await reservations.find({}).toArray();
        expect(result).toEqual([mockReservation]);
    });

    test('get single', async () => {
        const reservations = db.collection('reservations');
        mockReservation = { _id: '1', date: '10/10/23', time: '9pm', party: '2', name: 'John Doe', phone: '123-456-7890', email: 'email@email.com', notes: ''}
        const result = await reservations.find({ _id: '1' }).toArray();
        expect(result).toEqual([mockReservation]);
    });

    test('creates reservation', async () => {
        const reservations = db.collection('reservations');
        const mockReservation = { _id: '2', date: '10/10/23', time: '9pm', party: '2', name: 'John Doe', phone: '123-456-7890', email: 'email@email.com', notes: ''}
        await reservations.insertOne(mockReservation);

        const result = await reservations.findOne({ _id: '2' })
        expect(result).toEqual(mockReservation);
    });

    test('update reservation', async () => {
        const reservations = db.collection('reservations');
        mockReservation = { _id: '1', date: '10/10/24', time: '10pm', party: '20', name: 'Jane Doe', phone: '123-456-7890', email: 'email@email.com', notes: ''}
        await reservations.replaceOne({ _id: '1' }, mockReservation)
        const result = await reservations.find({ _id: '1' }).toArray();
        expect(result).toEqual([mockReservation]);
    });

    test('delete reservation', async () => {
        const reservations = db.collection('reservations');
        await reservations.deleteOne({ _id: '1' })
        const result = await reservations.find({ _id: '1' }).toArray();
        expect(result).toEqual([]);
    });
});

