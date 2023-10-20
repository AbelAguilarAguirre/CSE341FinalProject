const express = require('express');
const router = express.Router();
const passport = require('passport');
const employeesController = require('../controllers/employees');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');


router.get('/', employeesController.getAll);
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
router.get('/findByLastname/:lastname', isAuthenticated, employeesController.getEmployeesByLastName);
router.get('/findById/:id', isAuthenticated, employeesController.getEmployeeById);
router.put('/:id', isAuthenticated, validation.employeeRules, employeesController.updateEmployee);
router.delete('/:id', isAuthenticated, employeesController.deleteEmployee);
module.exports = router;
