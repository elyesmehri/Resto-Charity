// routes/usersRoutes.j
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const validate = require("../middle/validate");

// Routes
router.get('/:nom', usersController.showbyname);
router.get('/count', usersController.countUsers);
router.get('/', usersController.showAll);
router.get('/count', usersController.checkClient);

router.post('/add', validate, usersController.addOne);
router.delete('/:nom', usersController.deletebyname);
router.put('/:nom', validate, usersController.updatebyname);

router.delete('/del', usersController.deleteAll);

module.exports = router;
