import { IOrder } from '@modules/orders/domain/models/IOrder';
import { IBenefit } from '@modules/plans/domain/models/IBenefit';
import { IPlan } from '@modules/plans/domain/models/IPlan';
import { IPlanBenefits } from '@modules/plans/domain/models/IPlanBenefits';

declare module 'knex/types/tables' {
  interface Tables {
    plans: IPlan;
    benefits: IBenefit;
    plan_benefits: IPlanBenefits;
    orders: IOrder;
  }
}
