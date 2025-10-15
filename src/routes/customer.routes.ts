import { Router, RequestHandler } from 'express';
import * as customerController from '../controllers/customer.controller';
import { createCustomerDto } from '../dto/create-customer.dto';
import { handleValidation } from '../middlewares/validation.middleware';

const router = Router();

const validateCustomer: RequestHandler[] = [...createCustomerDto, handleValidation];

// Routes
router.post('/', validateCustomer, customerController.createCustomer);
router.put('/:id', validateCustomer, customerController.updateCustomer);
router.get('/', customerController.getCustomers);
router.get('/:id', customerController.getCustomer);
router.delete('/:id', customerController.deleteCustomer);

export default router;
