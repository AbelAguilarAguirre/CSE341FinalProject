const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Employees']
    mongodb
        .getDb()
        .db()
        .collection('employees')
        .find()
        .toArray()
        .then((employees) => {
            res.json(employees);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const createEmployee = (req, res) => {
    //#swagger.tags=['Employees']
    const employee = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        notes: req.body.notes,
    };
    mongodb
        .getDb()
        .db()
        .collection('employees')
        .insertOne(employee)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const getEmployeeById = (req, res) => {
    //#swagger.tags=['Employees']
    const employeeId = new ObjectId(req.params.id);
        mongodb.getDb();
        console.log("Test 1");
        mongodb.db();
        console.log("Test 2");
        mongodb.collection('employees');
        console.log("Test 3");
        mongodb.find({ _id: employeeId });
        console.log("Test 4");
        mongodb.toArray();
        console.log("Test 5");
        mongodb.then((employees) => {
            console.log("Test 6")
            res.json(employees[0]);
        });
        mongodb.catch((err) => {
            console.log("Test 7")
            res.status(500).json({ message: err.message });
        });
};

const getEmployeesByLastName = (req, res) => {
    //#swagger.tags=['Employees']
    const lastname = req.params.last_name;
    mongodb.getDb()
        .db()
        .collection('employees')
        .find({ last_name: lastname })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
};

const updateEmployee = (req, res) => {
    //#swagger.tags=['Employees']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id.');
    }
    const employeeId = new ObjectId(req.params.id);
    const employee = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        notes: req.body.notes,
    };
    mongodb
        .getDb()
        .db()
        .collection('employees')
        .replaceOne({ _id: employeeId }, employee)
        .then((result) => {
            res.json(result).send();
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const deleteEmployee = (req, res) => {
    //#swagger.tags=['Employees']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id.');
    }
    const employeeId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('employees')
        .deleteOne({ _id: employeeId })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

module.exports = {
    getAll,
    createEmployee,
    getEmployeeById,
    getEmployeesByLastName,
    updateEmployee,
    deleteEmployee,
};