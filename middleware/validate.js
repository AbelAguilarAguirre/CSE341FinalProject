const validator = require('../helpers/validate');

const reservationRules = (req, res, next) => {
    const validationRule = {
        date: "required|date",
        time: "required",
        party: "required|integer",
        name: "required|string",
        phone: "required|string",
        email: "required|email",
        notes: "string",
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
        first_name: "required|string",
        last_name: "required|string",
        email: "required|email",
        phone: "required|string",
        position: "required|string",
        notes: "string",
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

const menuRules = (req, res, next) => {
    const validationRule = {
        menuName: "required|string",
        category: "string",
        cost: "required|integer",
        orderHistory: "required|integer",
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

const inventoryRules = (req, res, next) => {
    const validationRule = {
        item_name: "required|string",
        description: "string",
        unit_cost: "required|integer",
        in_stock: "required|integer",
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
    employeeRules,
    menuRules,
    inventoryRules
};