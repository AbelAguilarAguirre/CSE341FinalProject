const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    const db = mongodb.getDb();
    db.collection('employees')
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
    const db = mongodb.getDb();
    const { firstname, lastname, department, position, salary } = req.body;
    const employee = {
        employee_first_name: req.body.employee_first_name,
        employee_last_name: req.body.employee_last_name,
        employee_email: req.body.employee_email,
        employee_phone: req.body.employee_phone,
        employee_position: req.body.employee_position,
        employee_notes: req.body.employee_notes,
    };
    db.collection('employees')
        .insertOne(employee)
        .then((result) => {
            res.json(result.ops[0]);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const getEmployeeById = (req, res) => {
    const db = mongodb.getDb();
    db.collection('employees')
        .findOne({ _id: ObjectId(req.params.employeeid) })
        .then((employee) => {
            res.json(employee);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const getEmployeesByLastName = (req, res) => {
    const db = mongodb.getDb();
    db.collection('employees')
        .find({ employee_last_name: req.params.lastname })
        .toArray()
        .then((employees) => {
            res.json(employees);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const updateEmployee = (req, res) => {
    const db = mongodb.getDb();
    const employee = {
        employee_first_name: req.body.employee_first_name,
        employee_last_name: req.body.employee_last_name,
        employee_email: req.body.employee_email,
        employee_phone: req.body.employee_phone,
        employee_position: req.body.employee_position,
        employee_notes: req.body.employee_notes,
    };
    db.collection('employees')
        .findOneAndUpdate(
            { _id: ObjectId(req.params.employeeid) },
            { $set: employee },
            { returnOriginal: false }
        )
        .then((result) => {
            res.json(result.value);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const deleteEmployee = (req, res) => {
    const db = mongodb.getDb();
    db.collection('employees')
        .deleteOne({ _id: ObjectId(req.params.id) })
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