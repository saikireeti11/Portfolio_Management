const { body } = require('express-validator');

const fundValidator = [
  body('amc_id').isInt({ min: 1 }).withMessage('Valid AMC ID is required'),
  body('fund_name').trim().notEmpty().withMessage('Fund name is required'),
  body('fund_type').optional().trim(),
  body('category').optional().trim(),
  body('latest_nav')
    .isFloat({ min: 0.01 })
    .withMessage('NAV must be a positive number'),
];

const navUpdateValidator = [
  body('latest_nav')
    .isFloat({ min: 0.01 })
    .withMessage('NAV must be a positive number'),
];

module.exports = { fundValidator, navUpdateValidator };