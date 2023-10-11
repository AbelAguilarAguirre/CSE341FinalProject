const express = require('express');
const router = express.Router();
const passport = require('passport');
const employeesController = require('../controllers/employees');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');


router.get('/', isAuthenticated, employeesController.getAll);
router.post('/', isAuthenticated, validation.employeeRules, employeesController.createEmployee);
router.get('/login', passport.authenticate('github'), (req, res) => {});
//#swagger.tags=['Employees']
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
        });
}); 
//#swagger.tags=['Employees']
router.get('/:lastname', isAuthenticated, employeesController.getEmployeesByLastName);
router.get('/:employeeid', isAuthenticated, employeesController.getEmployeeById);
router.put('/:employeeid', isAuthenticated, validation.employeeRules, employeesController.updateEmployee);
router.delete('/:id', isAuthenticated, employeesController.deleteEmployee);
module.exports = router;
