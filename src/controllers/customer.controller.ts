import { Request, Response, NextFunction } from 'express';
import * as customerService from '../services/customer.service';

export const createCustomer = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email } = req.body;
        const newCustomer = customerService.createNewCustomer({ firstName, lastName, email });
        res.status(201).json(newCustomer);
    } catch (error) {
        next(error); // Pass errors to the central error handler
    }
};

export const getCustomers = (req: Request, res: Response, next: NextFunction) => {
    try {
        const allCustomers = customerService.findAllCustomers();
        res.status(200).json(allCustomers);
    } catch (error) {
        next(error);
    }
};