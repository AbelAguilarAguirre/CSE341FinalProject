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
    mongodb
        .getDb()
        .db()
        .collection('reservations')
        .findOne({ _id: ObjectId(req.params.id) })
        .then((reservation) => {
            res.json(reservation);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const createReservation = (req, res) => {
    //#swagger.tags=['Reservations']
    const { reservation_date, reservation_time, reservation_party, reservation_name, reservation_phone, reservation_email, reservation_notes } = req.body;
    const reservation = {
        reservation_date: req.body.reservation_date,
        reservation_time: req.body.reservation_time,
        reservation_party: req.body.reservation_party,
        reservation_name: req.body.reservation_name,
        reservation_phone: req.body.reservation_phone,
        reservation_email: req.body.reservation_email,
        reservation_notes: req.body.reservation_notes,
    };
    mongodb
        .getDb()
        .db()
        .collection('reservations')
        .insertOne(reservation)
        .then((result) => {
            res.json(result.ops[0]);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const updateReservation = (req, res) => {
    //#swagger.tags=['Reservations']
    const reservation = {
        reservation_date: req.body.reservation_date,
        reservation_time: req.body.reservation_time,
        reservation_party: req.body.reservation_party,
        reservation_name: req.body.reservation_name,
        reservation_phone: req.body.reservation_phone,
        reservation_email: req.body.reservation_email,
        reservation_notes: req.body.reservation_notes,
    };
    mongodb
        .getDb()
        .db()
        .collection('reservations')
        .findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: reservation }, { returnOriginal: false })
        .then((result) => {
            res.json(result.value);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const deleteReservation = (req, res) => {
    //#swagger.tags=['Reservations']
    mongodb
        .getDb()
        .db()
        .collection('reservations')
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
    getSingle,
    createReservation,
    updateReservation,
    deleteReservation,
};