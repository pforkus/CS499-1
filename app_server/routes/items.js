var express = require('express');
var router = express.Router();
var controller = require('../controllers/items');
var requireAuth = require('../middleware/auth');

// Require a valid token for all routes defined here
router.use(requireAuth);

// Defines route to GET items, and POST new items
router
    .route('/')
    .get(controller.getItems)
    .post(controller.createItem);

// Defines route to retrieve categories
router
    .route('/categories')
    .get(controller.getCategories);

// Define route to retrieve names
router
    .route('/names')
    .get(controller.getAllNames);

// Define route for item endpoint
router
    .route('/:id')
    .get(controller.getItem) 
    .delete(controller.deleteItem)
    .put(controller.updateItem);

// Defines route for delete many endpoint
router
    .route('/delete-many')
    .post(controller.deleteItems);

module.exports = router;