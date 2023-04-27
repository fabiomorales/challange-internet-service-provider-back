import orderRouter from '@modules/orders/infra/routes/order.routes';
import benefitRouter from '@modules/plans/infra/routes/benefit.routes';
import planRouter from '@modules/plans/infra/routes/plan.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/order', orderRouter);
routes.use('/benefit', benefitRouter);
routes.use('/plan', planRouter);

routes.get('/', (_request, response) => {
  return response.json({ message: 'Hello Dev!' });
});

export default routes;
