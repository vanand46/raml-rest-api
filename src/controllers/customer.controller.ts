import { Request, Response } from 'express';
import { Customer } from '../modelClasses/customer';

const customerDB = new Map<number, Customer>();
let idCounter = 0;


/**
 * @desc    Create a new customer
 */
export const createCustomer = (req: Request, res: Response) => {
    const newCustomer = req.customer!;

    idCounter++;
    newCustomer.id = idCounter;
    customerDB.set(newCustomer.id, newCustomer);

    console.log('Customer created:', newCustomer);
    console.log('Current Database State:', Array.from(customerDB.values()));

    res.status(201).json(newCustomer);
}