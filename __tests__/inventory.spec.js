const { MongoClient } = require('mongodb');
const mockInventory = { 
    _id: '1', 
    item_name: 'item name', 
    description: 'This is a description', 
    unit_cost: 1, 
    in_stock: 2
}
const mockCreateInventory = { 
    _id: '2', 
    menuName: 'item name 2', 
    category: 'This is a created item.', 
    cost: 1, 
    orderHistory: 2
}
const mockUpdateInventory = { 
    _id: '1', 
    menuName: 'item name updated', 
    category: 'This is an updated item.', 
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


    test('gets all', async () => {
        const inventory = db.collection('inventory');
        await inventory.insertOne(mockInventory);

        const result = await inventory.find({}).toArray();
        expect(result).toEqual([mockInventory]);
    });

    test('gets single', async () => {
        const inventory = db.collection('inventory');
        const result = await inventory.find({ _id: '1' }).toArray();
        expect(result).toEqual([mockInventory]);
    });

    test('creates inventory', async () => {
        const inventory = db.collection('inventory');
        await inventory.insertOne(mockCreateInventory);

        const result = await inventory.findOne({ _id: '2' })
        expect(result).toEqual(mockCreateInventory);
    });

    test('updates inventory', async () => {
        const inventory = db.collection('inventory');
        await inventory.replaceOne({ _id: '1' }, mockUpdateInventory)
        const result = await inventory.find({ _id: '1' }).toArray();
        expect(result).toEqual([mockUpdateInventory]);
    });

    test('deletes inventory', async () => {
        const inventory = db.collection('inventory');
        await inventory.deleteOne({ _id: '1' })
        const result = await inventory.find({ _id: '1' }).toArray();
        expect(result).toEqual([]);
    });
});

