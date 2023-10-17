const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');


router.get('/', menuController.getAllMenu);
router.post('/', validation.menuRules, menuController.createMenu);
router.get('/:id', menuController.getMenuById);
router.put('/:id', validation.menuRules, menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);


module.exports = router;