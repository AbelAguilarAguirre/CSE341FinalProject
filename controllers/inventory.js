const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllItems = (req, res) => {
    //#swagger.tags=['Inventory']
    mongodb
        .getDb()
        .db()
        .collection('inventory')
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
    //#swagger.tags=['Inventory']
    const inventory = {
        item_name: req.body.item_name,
        description: req.body.description,
        unit_cost: req.body.unit_cost,
        in_stock: req.body.in_stock
    };
    mongodb
        .getDb()
        .db()
        .collection('inventory')
        .insertOne(inventory)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const getInventoryById = async (req, res) => {
    //#swagger.tags=['Inventory']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id.');
    }
    const inventoryId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('inventory')
        .find({ _id: inventoryId })
        .toArray()
        .then((inventory) => {
            res.json(inventory);
        }).catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const updateInventory = (req, res) => {
    //#swagger.tags=['Inventory']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid inventory id.')
    }
    const inventoryId = new ObjectId(req.params.id);
    const inventory = {
        item_name: req.body.item_name,
        description: req.body.description,
        unit_cost: req.body.unit_cost,
        in_stock: req.body.in_stock
    };
    mongodb
        .getDb()
        .db()
        .collection('inventory')
        .replaceOne(
            { _id: inventoryId }, inventory
        )
        .then((result) => {
            res.json(result.value);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const deleteInventory = (req, res) => {
    //#swagger.tags=['Inventory']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid inventory id.')
    }
    const inventoryId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('inventory')
        .deleteOne({ _id: inventoryId })
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