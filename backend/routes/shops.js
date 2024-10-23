const express = require('express');
const shopController = require('../controllers/shopController');
const router = express.Router();

router.get('/slots', shopController.getSlots);
router.post('/register', shopController.registerShop);

module.exports = router;
