const express = require('express');
const router = express.Router();
const sipController = require('../controllers/sip.controller');
const { protect } = require('../middleware/Auth');
const { validate } = require('../middleware/Errorhandler');
const { sipValidator } = require('../validators/sip.validators');

router.post('/', protect, sipValidator, validate, sipController.createSip);
router.get('/', protect, sipController.getAllSips);
router.get('/:id', protect, sipController.getSipById);
router.post('/:id/process', protect, sipController.processSip);
router.get('/:id/transactions', protect, sipController.getSipTransactions);

module.exports = router;
