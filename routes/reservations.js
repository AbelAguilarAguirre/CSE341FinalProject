const express = require('express');
const router = express.Router();

const reservationsController = require('../controllers/reservations');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', reservationsController.getAll);

router.get('/:id', reservationsController.getSingle);

router.post('/', isAuthenticated, validation.reservationRules, reservationsController.createReservation);

router.put('/:id', isAuthenticated, validation.reservationRules, reservationsController.updateReservation);

router.delete('/:id', isAuthenticated, reservationsController.deleteReservation);

module.exports = router;
