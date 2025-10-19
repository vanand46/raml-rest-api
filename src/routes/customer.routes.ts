import { Router, RequestHandler } from 'express';
import { container } from 'tsyringe';
import { CustomController } from '../controllers/customer.controller';
import { createCustomerDto } from '../dto/create-customer.dto';
import { handleValidation } from '../middlewares/validation.middleware';

const router = Router();
const controller = container.resolve(CustomController);


const validateCustomer: RequestHandler[] = [...createCustomerDto, handleValidation];

// Routes
router.post('/', validateCustomer, controller.create);
router.put('/:id', validateCustomer, controller.update);
router.get('/', controller.getCustomers);
router.get('/:id', controller.getCustomer);
router.delete('/:id', controller.delete);

export default router;
