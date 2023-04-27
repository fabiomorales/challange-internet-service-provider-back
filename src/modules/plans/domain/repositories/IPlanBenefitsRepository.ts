import { IBenefit } from '../models/IBenefit';
import { IPlanBenefits } from '../models/IPlanBenefits';

export interface IPlanBenefitsRepository {
  findById(id: string): Promise<IPlanBenefits | undefined>;
  findAllByPlanId(planId: string): Promise<Array<IPlanBenefits> | undefined>;
  create(planBenefits: Partial<IPlanBenefits>): Promise<IPlanBenefits>;
  update(
    planId: string,
    benefitsInclude: Array<IBenefit['id']>,
    benefitsExclude: Array<IPlanBenefits['id']>,
  ): Promise<void>;
  delete(id: string): Promise<void>;
}
