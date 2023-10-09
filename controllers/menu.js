const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllMenu = (req, res) => {
    //#swagger.tags=['Menu']
    const db = mongodb.getDb();
    db.collection('menu')
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
    const db = mongodb.getDb();
    const { menuName, category, cost, orderHistory } = req.body;
    const menu = {
        menu_menuName: req.body.menu_menuName,
        menu_category: req.body.menu_category,
        menu_cost: req.body.menu_cost,
        menu_orderHistory: req.body.menu_orderHistory
    };
    db.collection('menu')
        .insertOne(menu)
        .then((result) => {
            res.json(result.ops[0]);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const getMenuById = (req, res) => {
    //#swagger.tags=['Menu']
    const db = mongodb.getDb();
    db.collection('menu')
        .findOne({ _id: ObjectId(req.params.menuid) })
        .then((employee) => {
            res.json(employee);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const updateMenu = (req, res) => {
    //#swagger.tags=['Menu']
    const db = mongodb.getDb();
    const menu = {
        menu_menuName: req.body.menu_menuName,
        menu_category: req.body.menu_category,
        menu_cost: req.body.menu_cost,
        menu_orderHistory: req.body.menu_orderHistory,
    };
    db.collection('menu')
        .findOneAndUpdate(
            { _id: ObjectId(req.params.menuid) },
            { $set: menu },
            { returnOriginal: false }
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
    const db = mongodb.getDb();
    db.collection('menu')
        .deleteOne({ _id: ObjectId(req.params.id) })
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