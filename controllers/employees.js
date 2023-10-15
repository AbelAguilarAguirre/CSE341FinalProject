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

const getEmployeeById = async (req, res) => {
    //#swagger.tags=['Employees']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id.');
    }
    const employeeId = new ObjectId(req.params.id);
    mongodb.getDb()
        .db()
        .collection('employees')
        .find({ _id: employeeId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
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

const updateEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid Employee id to update an Employee.');
    }
    const employeeId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const employee = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        notes: req.body.notes,
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('employees')
        .replaceOne({ _id: employeeId }, employee);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the employee.');
    }
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