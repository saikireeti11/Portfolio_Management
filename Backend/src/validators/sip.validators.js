const { body } = require('express-validator');

const sipValidator = [
  body('investor_id').isInt({ min: 1 }).withMessage('Valid investor ID is required'),
  body('fund_id').isInt({ min: 1 }).withMessage('Valid fund ID is required'),
  body('portfolio_id').optional({ checkFalsy: true }).isInt({ min: 1 }).withMessage('Valid portfolio ID is required'),
  body('sip_amount').isFloat({ min: 0.01 }).withMessage('SIP amount must be a positive number'),
  body('sip_date').isInt({ min: 1, max: 31 }).withMessage('SIP date must be between 1 and 31'),
  body('start_date').isISO8601().withMessage('Valid start date is required')
];

module.exports = { sipValidator };
