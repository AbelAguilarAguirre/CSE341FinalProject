const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllMenu = (req, res) => {
    //#swagger.tags=['Menu']
    mongodb
        .getDb()
        .db()
        .collection('menu')
        .find()
        .toArray()
        .then((menu) => {
            res.json(menu);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const createMenu = (req, res) => {
    //#swagger.tags=['Menu']
    const menu = {
        menuName: req.body.menuName,
        category: req.body.category,
        cost: req.body.cost,
        orderHistory: req.body.orderHistory
    };
    mongodb
        .getDb()
        .db()
        .collection('menu')
        .insertOne(menu)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const getMenuById = async (req, res) => {
    //#swagger.tags=['Menu']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid menu id.')
    }
    const menuId = new ObjectId(req.params.id);
    mongodb.getDb()
        .db()
        .collection('menu')
        .find({ _id: menuId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
};

const updateMenu = (req, res) => {
    //#swagger.tags=['Menu']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid menu id.');
    }
    const menuId = new ObjectId(req.params.id);
    const menu = {
        menuName: req.body.menuName,
        category: req.body.category,
        cost: req.body.cost,
        orderHistory: req.body.orderHistory,
    };
    mongodb
        .getDb()
        .db()
        .collection('menu')
        .replaceOne(
            { _id: menuId }, menu
        )
        .then((result) => {
            res.json(result.value);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const deleteMenu = (req, res) => {
    //#swagger.tags=['Menu']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be a valid id.');
    }
    const menuId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('menu')
        .deleteOne({ _id: menuId })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

module.exports = {
    getAllMenu,
    createMenu,
    getMenuById,
    updateMenu,
    deleteMenu
}