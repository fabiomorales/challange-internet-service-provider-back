import { IBenefit } from '@modules/plans/domain/models/IBenefit';
import { IPlanBenefits } from '@modules/plans/domain/models/IPlanBenefits';
import { IPlanBenefitsRepository } from '@modules/plans/domain/repositories/IPlanBenefitsRepository';
import { knexormHelper } from '@shared/infra/knexorm';
import { Knex } from 'knex';

class PlanBenefitsRepository implements IPlanBenefitsRepository {
  private ormRepository: Knex;

  constructor() {
    this.ormRepository = knexormHelper.client;
  }

  public async findById(id: string): Promise<IPlanBenefits | undefined> {
    return await this.ormRepository('plan_benefits').select('*').where('id', id).first();
  }

  public async findAllByPlanId(planId: string): Promise<Array<IPlanBenefits> | undefined> {
    return await this.ormRepository('plan_benefits').select('*').where('plan_id', planId);
  }

  public async create(planBenefits: Partial<IPlanBenefits>): Promise<IPlanBenefits> {
    const [orderCreated] = await this.ormRepository('plan_benefits').insert(planBenefits).returning('*');

    return orderCreated;
  }

  public async update(
    planId: string,
    benefitsInclude: Array<IBenefit['id']>,
    benefitsExclude: Array<IPlanBenefits['id']>,
  ): Promise<void> {
    try {
      await knexormHelper.client.transaction(async trx => {
        const planBenefits = benefitsInclude.map(benefit => ({
          plan_id: planId,
          benefit_id: benefit,
        }));

        await trx('plan_benefits').insert(planBenefits);

        benefitsExclude.forEach(async planBenefit => {
          await trx('plan_benefits').del(planBenefit);
        });
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository('plan_benefits').where({ id }).del();
  }
}

export default PlanBenefitsRepository;
