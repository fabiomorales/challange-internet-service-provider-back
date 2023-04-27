import { ICreatePlan } from '@modules/plans/domain/models/ICreatePlan';
import PlanRepository from '@modules/plans/infra/knexorm/PlanRepository';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreatePlanService {
  constructor(
    @inject('PlanRepository')
    private planRepository: PlanRepository,
  ) {}

  public async execute(params: ICreatePlan): Promise<number | AppError> {
    try {
      const planExists = await this.planRepository.findByName(params?.plan?.name ?? '');

      if (planExists) {
        throw new AppError('there is already a plan with that name', StatusCodes.CONFLICT);
      }

      await this.planRepository.create(params.plan, params.benefits);

      return StatusCodes.CREATED;
    } catch (error) {
      return new AppError(error as string);
    }
  }
}

export default CreatePlanService;
