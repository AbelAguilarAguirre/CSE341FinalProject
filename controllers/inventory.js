const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllItems = (req, res) => {
    const db = mongodb.getDb();
    db.collection('inventory')
        .find()
        .toArray()
        .then((inventory) => {
            res.json(inventory);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const createItem = (req, res) => {
    const db = mongodb.getDb();
    const { itemName, description, unitCost, inStock } = req.body;
    const inventory = {
        inventory_itemName: req.body.inventory_itemName,
        inventory_description: req.body.inventory_description,
        inventory_unitCost: req.body.inventory_unitCost,
        inventory_inStock: req.body.inventory_inStock
    };
    db.collection('inventory')
        .insertOne(inventory)
        .then((result) => {
            res.json(result.ops[0]);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const getInventoryById = (req, res) => {
    const db = mongodb.getDb();
    db.collection('inventory')
        .findOne({ _id: ObjectId(req.params.inventoryid) })
        .then((inventory) => {
            res.json(inventory);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const updateInventory = (req, res) => {
    const db = mongodb.getDb();
    const inventory = {
        inventory_itemName: req.body.inventory_itemName,
        inventory_description: req.body.inventory_description,
        inventory_unitCost: req.body.inventory_unitCost,
        inventory_inStock: req.body.inventory_inStock
    };
    db.collection('inventory')
        .findOneAndUpdate(
            { _id: ObjectId(req.params.menuid) },
            { $set: inventory },
            { returnOriginal: false }
        )
        .then((result) => {
            res.json(result.value);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const deleteInventory = (req, res) => {
    const db = mongodb.getDb();
    db.collection('inventory')
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

module.exports = {
    getAllItems,
    createItem,
    getInventoryById,
    updateInventory,
    deleteInventory
}