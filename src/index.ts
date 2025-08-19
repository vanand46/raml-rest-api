import express, { Express } from 'express';

import {
    validateCustomerRules,
    handleValidationAndCreateCustomer
} from './middlewares/customer.middleware';
import { createCustomer } from './controllers/customer.controller';
import { getRoot } from './controllers/root.controller';

const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.get('/', getRoot);
app.post(
    '/customers',
    validateCustomerRules,
    handleValidationAndCreateCustomer,
    createCustomer
);

app.listen(port, () => {
    console.log(`Server is runnig on Port: ${port}`);
});