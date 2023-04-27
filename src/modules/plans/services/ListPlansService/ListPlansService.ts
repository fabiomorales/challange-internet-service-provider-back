import { IListPlansResponse } from '@modules/plans/domain/models/IListPlansResponse copy';
import PlanRepository from '@modules/plans/infra/knexorm/PlanRepository';
import AppError from '@shared/errors/AppError';
import { reducePlansByPlanId } from '@shared/utils/reducePlansByPlanId';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListPlansService {
  constructor(
    @inject('PlanRepository')
    private planRepository: PlanRepository,
  ) {}

  public async execute(): Promise<Array<IListPlansResponse> | AppError> {
    try {
      const plans = await this.planRepository.findAll();

      return reducePlansByPlanId(plans) as unknown as Array<IListPlansResponse>;
    } catch (error) {
      return new AppError(error as string);
    }
  }
}

export default ListPlansService;
