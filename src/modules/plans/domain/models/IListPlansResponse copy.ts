import { IListBenefitsResponse } from './IListBenefitsResponse';

export interface IListPlans {
  id: string;
  name: string;
  speed: number;
  speedType: string;
  price: number;
  bestPlan: boolean;
  benefits: Array<IListBenefitsResponse>;
}

export type IListPlansResponse = Array<IListPlans>;
