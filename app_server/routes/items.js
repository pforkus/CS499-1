var express = require('express');
var router = express.Router();
var controller = require('../controllers/items');

// GET all Items, POSTS new items
router
    .route('/')
    .get(controller.getItems)
    .post(controller.createItem);

// Get categories
router
    .route('/categories')
    .get(controller.getCategories);

router
    .route('/names')
    .get(controller.getAllNames);

// GET & DELETE
router
    .route('/:id')
    .get(controller.getItem)
    .delete(controller.deleteItem)
    .put(controller.updateItem);

// DELETE MANY
router
    .route('/delete-many')
    .post(controller.deleteItems);


module.exports = router;