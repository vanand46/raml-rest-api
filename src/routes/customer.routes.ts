import { Router } from 'express';
import * as customerController from '../controllers/customer.controller';
import { createCustomerDto } from '../dto/create-customer.dto';
import { handleValidation } from '../middlewares/validation.middleware';

const router = Router();

router.post(
    '/',
    createCustomerDto,
    handleValidation,
    customerController.createCustomer
);

router.get('/', customerController.getCustomers);

export default router;