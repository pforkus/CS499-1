var express = require('express');
var router = express.Router();
var controller = require('../controllers/items');

// GET
router.get('/', controller.getItems);

// DELETE
router.delete('/:id', controller.deleteItem);

// POST
router.post('/delete-many', controller.deleteItems);

module.exports = router;