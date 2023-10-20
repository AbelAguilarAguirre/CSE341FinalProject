const { MongoClient } = require('mongodb');
const mockMenu = { 
    _id: '1', 
    menuName: 'menu name', 
    category: 'category', 
    cost: 1, 
    orderHistory: 2
}
const mockCreateMenu = { 
    _id: '2', 
    menuName: 'menu name 2', 
    category: 'category', 
    cost: 1, 
    orderHistory: 2
}
const mockUpdateMenu = { 
    _id: '1', 
    menuName: 'menu name updated', 
    category: 'category', 
    cost: 1, 
    orderHistory: 2
}

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
        const menu = db.collection('menu');
        await menu.insertOne(mockMenu);

        const result = await menu.find({}).toArray();
        expect(result).toEqual([mockMenu]);
    });

    test('get single', async () => {
        const menu = db.collection('menu');
        const result = await menu.find({ _id: '1' }).toArray();
        expect(result).toEqual([mockMenu]);
    });

    test('creates reservation', async () => {
        const menu = db.collection('menu');
        await menu.insertOne(mockCreateMenu);

        const result = await menu.findOne({ _id: '2' })
        expect(result).toEqual(mockCreateMenu);
    });

    test('update reservation', async () => {
        const menu = db.collection('menu');
        await menu.replaceOne({ _id: '1' }, mockUpdateMenu)
        const result = await menu.find({ _id: '1' }).toArray();
        expect(result).toEqual([mockUpdateMenu]);
    });

    test('delete reservation', async () => {
        const menu = db.collection('menu');
        await menu.deleteOne({ _id: '1' })
        const result = await menu.find({ _id: '1' }).toArray();
        expect(result).toEqual([]);
    });
});

