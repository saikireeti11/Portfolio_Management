const express = require('express');
const router = express.Router();
const fundController = require('../controllers/fund.controller');
const { protect } = require('../middleware/Auth');
const { validate } = require('../middleware/Errorhandler');
const { fundValidator, navUpdateValidator } = require('../validators/Fund.validators');

router.post('/', protect, fundValidator, validate, fundController.createFund);
router.get('/', protect, fundController.getAllFunds);
router.get('/:id', protect, fundController.getFundById);
router.put('/:id/nav', protect, navUpdateValidator, validate, fundController.updateNav);

module.exports = router;
