const validator = require('../helpers/validate');

const reservationRules = (req, res, next) => {
    const validationRule = {
        reservation_date: "required|date",
        reservation_time: "required",
        reservation_party: "required|integer",
        reservation_name: "required|string",
        reservation_phone: "required|string",
        reservation_email: "required|email",
        reservation_notes: "string",
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                status: status,
                message: err
            });
        } else {
            next();
        }
    });
};

const employeeRules = (req, res, next) => {
    const validationRule = {
        employee_first_name: "required|string",
        employee_last_name: "required|string",
        employee_email: "required|email",
        employee_phone: "required|string",
        employee_position: "required|string",
        employee_notes: "string",
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                status: status,
                message: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    reservationRules,
    employeeRules
};