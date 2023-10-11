const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Reservations']
    mongodb
        .getDb()
        .db()
        .collection('reservations')
        .find()
        .toArray()
        .then((reservations) => {
            res.json(reservations);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const getSingle = (req, res) => {
    //#swagger.tags=['Reservations']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid reservation id.');
      }
    const reservationId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('reservations')
        .findOne({ _id: reservationId })
        .then((reservation) => {
            res.json(reservation);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const createReservation = (req, res) => {
    //#swagger.tags=['Reservations']
    const reservation = {
        date: req.body.date,
        time: req.body.time,
        party: req.body.party,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        notes: req.body.notes,
    };
    mongodb
        .getDb()
        .db()
        .collection('reservations')
        .insertOne(reservation)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const updateReservation = (req, res) => {
    //#swagger.tags=['Reservations']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid reservation id.');
        }
    const reservationId = new ObjectId(req.params.id);
    const reservation = {
        date: req.body.date,
        time: req.body.time,
        party: req.body.party,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        notes: req.body.notes,
    };
    mongodb
        .getDb()
        .db()
        .collection('reservations')
        .replaceOne({ _id: reservationId }, reservation)
        .then((result) => {
            res.json(result.value);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const deleteReservation = (req, res) => {
    //#swagger.tags=['Reservations']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid reservation id.');
        }
    const reservationId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('reservations')
        .remove({ _id: reservationId }, true)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

module.exports = {
    getAll,
    getSingle,
    createReservation,
    updateReservation,
    deleteReservation,
};