const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/employees', require('./employees'));
router.use('/menu', require('./menu'));

router.use('/reservations', require('./reservations'));
router.use('/inventory', require('./inventory'));

module.exports = router;
