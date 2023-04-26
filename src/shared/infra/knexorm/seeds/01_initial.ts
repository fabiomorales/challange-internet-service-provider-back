import { IBenefit } from '../../../../modules/plans/domain/models/IBenefit';
import { IPlan } from '../../../../modules/plans/domain/models/IPlan';
import { IPlanBenefits } from '../../../../modules/plans/domain/models/IPlanBenefits';
import { BenefitTypeEnum, SpeedTypeEnum } from '../../../utils/constants';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  try {
    const benefitsDefault: Array<Partial<IBenefit>> = [
      {
        description: 'Super Wi-Fi 6',
        img: 'wifi',
        benefit_type: BenefitTypeEnum.SERVICE,
      },
      {
        description: 'Instalação grátis',
        img: 'installation',
        benefit_type: BenefitTypeEnum.SERVICE,
      },
      {
        description: '200 Megas de download',
        img: 'download',
        benefit_type: BenefitTypeEnum.SERVICE,
      },
      {
        description: '30 Megas de upload',
        img: 'upload',
        benefit_type: BenefitTypeEnum.SERVICE,
      },
      {
        description: '400 Megas de download',
        img: 'download',
        benefit_type: BenefitTypeEnum.SERVICE,
      },
      {
        description: '100 Megas de upload',
        img: 'upload',
        benefit_type: BenefitTypeEnum.SERVICE,
      },
      {
        description: '1 Giga de download',
        img: 'download',
        benefit_type: BenefitTypeEnum.SERVICE,
      },
      {
        description: '400 Megas de upload',
        img: 'upload',
        benefit_type: BenefitTypeEnum.SERVICE,
      },
      {
        description: 'Paramount',
        img: 'paramount',
        benefit_type: BenefitTypeEnum.APP,
      },
      {
        description: 'McAfee',
        img: 'mcafee',
        benefit_type: BenefitTypeEnum.APP,
      },
      {
        description: 'Bit Trainers',
        img: 'bit-trainers',
        benefit_type: BenefitTypeEnum.APP,
      },
      {
        description: 'Skeelo',
        img: 'skeelo',
        benefit_type: BenefitTypeEnum.APP,
      },
      {
        description: 'Deezer',
        img: 'deezer',
        benefit_type: BenefitTypeEnum.APP,
      },
      {
        description: 'HBO Max',
        img: 'hbo-max',
        benefit_type: BenefitTypeEnum.APP,
      },
      {
        description: 'LEV Educa',
        img: 'lev-educa',
        benefit_type: BenefitTypeEnum.APP,
      },
      {
        description: 'Conta Outra Vez! Mini',
        img: 'conta-outra-vez-mini',
        benefit_type: BenefitTypeEnum.APP,
      },
      {
        description: 'Revistas Já!',
        img: 'revistas-ja',
        benefit_type: BenefitTypeEnum.APP,
      },
    ];

    const plansDefault: Array<Partial<IPlan>> = [
      {
        name: '200 Mega',
        speed: 200,
        speed_type: SpeedTypeEnum.MEGA,
        price: 99,
        best_plan: false,
      },
      {
        name: '400 Mega',
        speed: 400,
        speed_type: SpeedTypeEnum.MEGA,
        price: 149.99,
        best_plan: false,
      },
      {
        name: '1 Giga',
        speed: 1,
        speed_type: SpeedTypeEnum.GIGA,
        price: 249.99,
        best_plan: true,
      },
    ];

    await knex.transaction(async trx => {
      // Deletes ALL existing entries
      await knex('plans').del();
      await knex('benefits').del();
      await knex('plan_benefits').del();

      // Inserts seed entries
      const inserdetBenefits = await knex('benefits').insert(benefitsDefault).returning('*');

      const insertedPlan = await trx('plans').insert(plansDefault).returning('*');

      const planBenefits: Array<Partial<IPlanBenefits>> = [];

      insertedPlan.forEach(plan => {
        inserdetBenefits.forEach(benefit =>
          planBenefits.push({
            plan_id: plan.id,
            benefit_id: benefit.id,
          }),
        );
      });

      await trx('plan_benefits').insert(planBenefits);
    });
  } catch (error) {
    console.log('error', error);
  }
}
