import PlanRepository from '@modules/plans/infra/knexorm/PlanRepository';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeletePlanService {
  constructor(
    @inject('PlanRepository')
    private planRepository: PlanRepository,
  ) {}

  public async execute(id: string): Promise<number | AppError> {
    try {
      await this.planRepository.delete(id);

      return StatusCodes.NO_CONTENT;
    } catch (error) {
      return new AppError(error as string);
    }
  }
}

export default DeletePlanService;
