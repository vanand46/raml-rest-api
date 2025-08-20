import { Router } from 'express';
import customerRoutes from './customer.routes';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

router.use('/customers', customerRoutes);

export default router;