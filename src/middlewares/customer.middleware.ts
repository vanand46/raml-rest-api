import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

import { Customer } from "../modelClasses/customer";

export const validateCustomerRules = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('A valid email is required')
];

export const handleValidationAndCreateCustomer = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { firstName, lastName, email } = req.body;
    const customer = new Customer(firstName, lastName, email);

    req.customer = customer;

};