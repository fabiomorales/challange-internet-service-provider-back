import { IBenefit } from '../models/IBenefit';

export interface IBenefitRepository {
  findAll(): Promise<Array<IBenefit>>;
}
