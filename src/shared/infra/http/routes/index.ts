import orderRouter from '@modules/orders/infra/routes/atm.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/order', orderRouter);

routes.get('/', (_request, response) => {
  return response.json({ message: 'Hello Dev!' });
});

export default routes;
