import express, { Express, Request, Response } from 'express';
import { Customer } from './modelClasses/customer';

import {
    validateCustomerRules,
    handleValidationAndCreateCustomer
} from './middlewares/customer.middleware';

const app: Express = express();
const port: number = 3000;

app.use(express.json());

const customerDB = new Map<number, Customer>();
let idCounter = 0;

/**
 * @route   POST /customers
 * @desc    Create a new customer
 * @access  Public
 */
app.post(
    '/customers',
    validateCustomerRules,
    handleValidationAndCreateCustomer,
    (req: Request, res: Response) => {
        const newCustomer = req.customer!;

        idCounter++;
        newCustomer.id = idCounter;
        customerDB.set(newCustomer.id, newCustomer);

        console.log('Customer created:', newCustomer);
        console.log('Current Database State:', Array.from(customerDB.values()));

        res.status(201).json(newCustomer);
    }
);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello from REST');
});

app.listen(port, () => {
    console.log(`Server is runnig on Port: ${port}`);
});