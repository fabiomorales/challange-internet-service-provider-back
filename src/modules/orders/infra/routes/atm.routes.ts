import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import { createValidation } from '../controllers/OrderControllerValidation';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post('/', createValidation, orderController.create);

export default orderRouter;
