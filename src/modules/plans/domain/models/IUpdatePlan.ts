import { IBenefit } from './IBenefit';
import { IPlan } from './IPlan';
import { IPlanBenefits } from './IPlanBenefits';

export interface IUpdatePlan {
  plan: Partial<IPlan>;
  includeBenefits: Array<IBenefit['id']>;
  excludeBenefits: Array<IPlanBenefits['id']>;
}
