import { IBenefit } from '../models/IBenefit';
import { IPlan } from '../models/IPlan';
import { IPlanBenefits } from '../models/IPlanBenefits';

export interface IPlanRepository {
  findById(id: string): Promise<IPlan | undefined>;
  findAllById(id: string): Promise<Array<IPlan> | undefined>;
  findByName(name: string): Promise<IPlan | undefined>;
  findAll(): Promise<Array<IPlan>>;
  create(plan: Partial<IPlan>, benefits: Array<IBenefit['id']>): Promise<IPlan>;
  update(
    planId: string,
    plan: Partial<IPlan>,
    benefitsInclude: Array<IBenefit['id']>,
    benefitsExclude: Array<IPlanBenefits['id']>,
  ): Promise<void>;
  delete(id: string): Promise<void>;
}
