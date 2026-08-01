const express = require("express");
const router = express.Router();
const controller = require('../controllers/users');

router
    .route('/')
    .post(controller.createUser);

router
    .route('/login')
    .post(controller.login);

router
    .route('/health')
    .get(controller.health);

module.exports = router;
    