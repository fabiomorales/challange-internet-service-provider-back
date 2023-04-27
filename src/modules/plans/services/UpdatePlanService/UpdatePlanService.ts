import { IUpdatePlan } from '@modules/plans/domain/models/IUpdatePlan';
import PlanRepository from '@modules/plans/infra/knexorm/PlanRepository';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdatePlanService {
  constructor(
    @inject('PlanRepository')
    private planRepository: PlanRepository,
  ) {}

  public async execute(params: IUpdatePlan): Promise<number | AppError> {
    try {
      const planExists = await this.planRepository.findById(params?.plan?.id ?? '');

      if (params.plan.name !== planExists?.name) {
        const planNameExists = await this.planRepository.findByName(params?.plan?.name ?? '');

        if (planNameExists) {
          throw new AppError('There is already a plan with that name', StatusCodes.CONFLICT);
        }
      }

      if (!planExists) {
        throw new AppError('There is no plan with this id', StatusCodes.FORBIDDEN);
      }

      await this.planRepository.update(params.plan.id!, params.plan, params.includeBenefits, params.excludeBenefits);

      return StatusCodes.CREATED;
    } catch (error) {
      return new AppError(error as string);
    }
  }
}

export default UpdatePlanService;
