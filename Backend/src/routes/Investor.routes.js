const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investor.controller');
const { protect } = require('../middleware/Auth');
const { validate } = require('../middleware/Errorhandler');
const { investorValidator } = require('../validators/Investor.validators');

router.post('/', protect, investorValidator, validate, investorController.createInvestor);
router.get('/', protect, investorController.getAllInvestors);
router.get('/:id', protect, investorController.getInvestorById);
router.get('/:id/holdings', protect, investorController.getHoldings);
router.get('/:id/networth', protect, investorController.getNetWorth);

module.exports = router;
