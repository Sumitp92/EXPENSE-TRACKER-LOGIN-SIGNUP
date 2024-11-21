const express = require('express');
const router = express.Router();
const { AddUser, LoginUser } = require('../controllers/expense'); // Make sure this is correct

router.post('/signup', AddUser);
router.post('/login', LoginUser);

module.exports = router;
