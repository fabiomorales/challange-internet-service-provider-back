import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import OrderRepository from '@modules/orders/infra/knexorm/OrderRepository';

import { container } from 'tsyringe';

container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository);
