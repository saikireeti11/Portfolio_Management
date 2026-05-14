const { body } = require('express-validator');

const investorValidator = [
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('last_name').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional({ checkFalsy: true }).isMobilePhone('any').withMessage('Valid phone number required'),
  body('pan_number')
    .optional({ checkFalsy: true })
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage('Invalid PAN format (e.g. ABCDE1234F)'),
];

module.exports = { investorValidator };
