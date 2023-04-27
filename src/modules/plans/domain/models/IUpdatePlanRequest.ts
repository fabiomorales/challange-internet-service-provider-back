import { IBenefit } from './IBenefit';

export interface IUpdatePlan {
  id: string;
  name: string;
  speed: number;
  speedType: string;
  price: number;
  bestPlan: boolean;
}

export interface IUpdatePlanRequest {
  plan: IUpdatePlan;
  includeBenefits: Array<IBenefit['id']>;
  excludeBenefits: Array<IBenefit['id']>;
}
