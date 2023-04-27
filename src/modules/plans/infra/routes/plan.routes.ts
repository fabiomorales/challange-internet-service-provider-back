import { Router } from 'express';
import PlanController from '../controllers/PlanController';
import { createValidation, deleteValidation, updateValidation } from '../controllers/PlanControllerValidation';

const planRouter = Router();
const planController = new PlanController();

planRouter.get('/', planController.index);

planRouter.post('/', createValidation, planController.create);

planRouter.put('/', updateValidation, planController.update);

planRouter.delete('/:id', deleteValidation, planController.delete);

export default planRouter;
