import { IBenefit } from './IBenefit';

export interface ICreatePlanRequest {
  name: string;
  speed: number;
  speedType: string;
  price: number;
  bestPlan: boolean;
  benefits: Array<IBenefit['id']>;
}
