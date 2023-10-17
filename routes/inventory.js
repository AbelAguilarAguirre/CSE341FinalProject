const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/inventory');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', inventoryController.getAllItems);
router.post('/', isAuthenticated, validation.inventoryRules, inventoryController.createItem);
router.get('/:id', inventoryController.getInventoryById);
router.put('/:id', isAuthenticated, validation.inventoryRules, inventoryController.updateInventory);
router.delete('/:id', isAuthenticated, inventoryController.deleteInventory);

module.exports = router;