import { IBenefit } from './IBenefit';
import { IPlan } from './IPlan';

export interface ICreatePlan {
  plan: Partial<IPlan>;
  benefits: Array<IBenefit['id']>;
}
