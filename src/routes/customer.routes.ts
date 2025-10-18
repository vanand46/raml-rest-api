import { Router, RequestHandler } from 'express';
import { CustomController } from '../controllers/customer.controller';
import { createCustomerDto } from '../dto/create-customer.dto';
import { handleValidation } from '../middlewares/validation.middleware';

const router = Router();
const customerController = new CustomController();


const validateCustomer: RequestHandler[] = [...createCustomerDto, handleValidation];

// Routes
router.post(
    '/',
    validateCustomer,
    customerController.create.bind(customerController)
);
router.put(
    '/:id',
    validateCustomer,
    customerController.update.bind(customerController)
);
router.get(
    '/',
    customerController.getCustomers.bind(customerController),
);
router.get(
    '/:id',
    customerController.getCustomer.bind(customerController)
);

router.delete(
    '/:id',
    customerController.delete.bind(customerController),
);

export default router;
