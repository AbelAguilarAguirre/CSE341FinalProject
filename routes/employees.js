const express = require('express');
const router = express.Router();
const passport = require('passport');
const employeesController = require('../controllers/employees');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');


router.get('/', isAuthenticated, employeesController.getAll);
router.post('/', isAuthenticated, validation.saveEmployee, employeesController.createEmployee);
router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
        });
}); 
router.get('/:lastname', employeesController.getEmployeesByLastName);
router.get('/:employeeid', isAuthenticated, employeesController.getEmployeeById);
router.put('/:employeeid', isAuthenticated, validation.saveEmployee, employeesController.updateEmployee);
router.delete('/:id', isAuthenticated, employeesController.deleteEmployee);
module.exports = router;
