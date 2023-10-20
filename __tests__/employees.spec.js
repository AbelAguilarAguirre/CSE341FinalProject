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
    const employees = db.collection('employees');
    const mockEmployee = { first_name: 'John', last_name: 'Doe' };
    await employees.insertOne(mockEmployee);

    const result = await employees.find({}).toArray();
    expect(result).toEqual([mockEmployee]);
  });

  test('creates employee', async () => {
    const employees = db.collection('employees');
    const mockEmployee = { _id: 'some-user-id', first_name: 'John', last_name: 'Doe' };
    await employees.insertOne(mockEmployee);

    const result = await employees.findOne({ _id: 'some-user-id' })
    expect(result).toEqual(mockEmployee);
  });

  test('get employee by id', async () => {
    const employees = db.collection('employees');
    const mockEmployee = { _id: '1', first_name: 'John', last_name: 'Doe' };
    await employees.insertOne(mockEmployee);

    const result = await employees.find({ _id: '1' }).toArray();
    expect(result).toEqual([mockEmployee]);
  });

  test('get employee by last name', async () => {
    const employees = db.collection('employees');
    const mockEmployee = { first_name: 'John', last_name: 'Joe' };
    await employees.insertOne(mockEmployee);

    const result = await employees.find({ last_name: 'Joe' }).toArray();
    expect(result).toEqual([mockEmployee]);
  });

  test('update employee', async () => {
    const employees = db.collection('employees');
    mockEmployee = { _id: '1', first_name: 'Jane', last_name: 'Doe' };
    await employees.replaceOne({ _id: '1' }, mockEmployee)
    const result = await employees.find({ _id: '1' }).toArray();
    expect(result).toEqual([mockEmployee]);
  });

  test('delete employee', async () => {
    const employees = db.collection('employees');
    await employees.deleteOne({ _id: '1' })
    const result = await employees.find({ _id: '1' }).toArray();
    expect(result).toEqual([]);
  });
});

