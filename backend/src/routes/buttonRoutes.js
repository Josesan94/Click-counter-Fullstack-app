const express = require('express');
const router = express.Router();
const db = require('../db/queries');

router.get('/buttons', db.getButtons);

router.post('/buttons', db.createButtons);

router.delete('/buttons/:id', db.deleteButton);

router.put('/buttons/:id', db.updateButtonClickCount)

module.exports = router;