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
    const { menuName, category, cost, orderHistory } = req.body;
    const menu = {
        menu_menuName: req.body.menu_menuName,
        menu_category: req.body.menu_category,
        menu_cost: req.body.menu_cost,
        menu_orderHistory: req.body.menu_orderHistory
    };
    mongodb
        .getDb()
        .db()
        .collection('menu')
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
    mongodb
        .getDb()
        .db()
        .collection('menu')
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
    
    const menu = {
        menu_menuName: req.body.menu_menuName,
        menu_category: req.body.menu_category,
        menu_cost: req.body.menu_cost,
        menu_orderHistory: req.body.menu_orderHistory,
    };
    mongodb
        .getDb()
        .db()
        .collection('menu')
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