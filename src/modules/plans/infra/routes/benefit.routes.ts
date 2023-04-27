import { Router } from 'express';
import BenefitController from '../controllers/BenefitController';

const benefitRouter = Router();
const benefitController = new BenefitController();

benefitRouter.get('/', benefitController.index);

export default benefitRouter;
