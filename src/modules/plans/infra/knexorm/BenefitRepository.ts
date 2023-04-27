import { IBenefit } from '@modules/plans/domain/models/IBenefit';
import { IBenefitRepository } from '@modules/plans/domain/repositories/IBenefitRepository';
import { knexormHelper } from '@shared/infra/knexorm';
import { Knex } from 'knex';

class BenefitRepository implements IBenefitRepository {
  private ormRepository: Knex;

  constructor() {
    this.ormRepository = knexormHelper.client;
  }

  public async findAll(): Promise<Array<IBenefit>> {
    return await this.ormRepository('benefits').select('*');
  }
}

export default BenefitRepository;
