import { body } from 'express-validator';

export const createCustomerDto = [
  body('firstName').notEmpty().withMessage('First name is required').trim(),
  body('lastName').notEmpty().withMessage('Last name is required').trim(),
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
];