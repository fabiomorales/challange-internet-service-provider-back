import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import { createValidation, deleteValidation, updateValidation } from '../controllers/OrderControllerValidation';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get('/', orderController.index);

orderRouter.post('/', createValidation, orderController.create);

orderRouter.put('/', updateValidation, orderController.update);

orderRouter.delete('/:id', deleteValidation, orderController.delete);

export default orderRouter;
