import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import OrderRepository from '@modules/orders/infra/knexorm/OrderRepository';
import { IBenefitRepository } from '@modules/plans/domain/repositories/IBenefitRepository';
import { IPlanBenefitsRepository } from '@modules/plans/domain/repositories/IPlanBenefitsRepository';
import { IPlanRepository } from '@modules/plans/domain/repositories/IPlanRepository';
import BenefitRepository from '@modules/plans/infra/knexorm/BenefitRepository';
import PlanBenefitsRepository from '@modules/plans/infra/knexorm/PlanBenefitsRepository';
import PlanRepository from '@modules/plans/infra/knexorm/PlanRepository';

import { container } from 'tsyringe';

container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository);

container.registerSingleton<IBenefitRepository>('BenefitRepository', BenefitRepository);

container.registerSingleton<IPlanRepository>('PlanRepository', PlanRepository);

container.registerSingleton<IPlanBenefitsRepository>('PlanBenefitsRepository', PlanBenefitsRepository);
