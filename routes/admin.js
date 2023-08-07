const express = require('express');
const router = express.Router();
const AdminController = require('../logic/admin');
router.post('/register', AdminController.create);
router.post('/authenticate', AdminController.authenticate);
module.exports = router;