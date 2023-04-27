import { IBenefit } from '@modules/plans/domain/models/IBenefit';
import { IPlan } from '@modules/plans/domain/models/IPlan';
import { IPlanBenefits } from '@modules/plans/domain/models/IPlanBenefits';
import { IPlanRepository } from '@modules/plans/domain/repositories/IPlanRepository';
import { knexormHelper } from '@shared/infra/knexorm';
import { StatusCodes } from 'http-status-codes';
import { Knex } from 'knex';

class PlanRepository implements IPlanRepository {
  private ormRepository: Knex;

  constructor() {
    this.ormRepository = knexormHelper.client;
  }

  public async findAll(): Promise<Array<IPlan>> {
    return await this.ormRepository('plans')
      .select('*')
      .leftJoin('plan_benefits', 'plans.id', '=', 'plan_benefits.plan_id')
      .leftJoin('benefits', 'plan_benefits.benefit_id', '=', 'benefits.id');
  }

  public async findById(id: string): Promise<IPlan | undefined> {
    return await this.ormRepository('plans').select('*').where('id', id).first();
  }

  public async findAllById(id: string): Promise<Array<IPlan> | undefined> {
    return await this.ormRepository('plans')
      .select('*')
      .where('plans.id', id)
      .join('plan_benefits', 'plans.id', '=', 'plan_benefits.plan_id')
      .join('benefits', 'plan_benefits.benefit_id', '=', 'benefits.id');
  }

  public async findByName(name: string): Promise<IPlan | undefined> {
    return await this.ormRepository('plans').select('*').where('name', name).first();
  }

  public async create(plan: Partial<IPlan>, benefits: Array<IBenefit['id']>): Promise<IPlan> {
    try {
      let planCreated: IPlan = {} as IPlan;

      await knexormHelper.client.transaction(async trx => {
        const [insertedPlan] = await trx('plans').insert(plan).returning('*');

        planCreated = insertedPlan;

        const planBenefits = benefits.map(benefit => ({
          plan_id: insertedPlan.id,
          benefit_id: benefit,
        }));

        await trx('plan_benefits').insert(planBenefits).returning('*');
      });

      return planCreated;
    } catch (error) {
      console.log('error', error);
      return error as IPlan;
    }
  }

  public async update(
    id: string,
    plan: Partial<IPlan>,
    benefitsInclude: Array<IBenefit['id']>,
    benefitsExclude: Array<IPlanBenefits['id']>,
  ): Promise<void> {
    try {
      await knexormHelper.client.transaction(async trx => {
        await trx('plans').where({ id }).update(plan);

        if (benefitsInclude.length) {
          const planBenefits = benefitsInclude.map(benefit => ({
            plan_id: id,
            benefit_id: benefit,
          }));

          await trx('plan_benefits').insert(planBenefits);
        }

        if (benefitsExclude.length) {
          const idsToDelete = benefitsExclude.map(async planBenefit => {
            const planBenefits = await trx('plan_benefits')
              .select('id')
              .where('plan_id', id)
              .andWhere('benefit_id', planBenefit)
              .first()
              .then(response => {
                return trx('plan_benefits').where('id', response?.id).del();
              });

            return planBenefits;
          });

          return Promise.all(idsToDelete).then(response => response);
        }

        return StatusCodes.CREATED;
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository('plans').where({ id }).del();
  }
}

export default PlanRepository;
