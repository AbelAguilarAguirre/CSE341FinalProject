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
            res.json(result.ops[0]);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const getInventoryById = async (req, res) => {
    //#swagger.tags=['Inventory']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id.');
    }
    const inventoryId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('inventory')
        .find({ _id: inventoryId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
};

const updateInventory = (req, res) => {
    //#swagger.tags=['Inventory']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid inventory id.')
    }
    const inventoryId = new ObjectId(req.params.id);
    const inventory = {
        itemName: req.body.itemName,
        description: req.body.description,
        unitCost: req.body.unitCost,
        inStock: req.body.inStock
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