import { IListBenefitsResponse } from '@modules/plans/domain/models/IListBenefitsResponse';
import BenefitRepository from '@modules/plans/infra/knexorm/BenefitRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListBenefitsService {
  constructor(
    @inject('BenefitRepository')
    private benefitRepository: BenefitRepository,
  ) {}

  public async execute(): Promise<Array<IListBenefitsResponse> | AppError> {
    try {
      const benefits = await this.benefitRepository.findAll();

      const listBenefitsResponse: Array<IListBenefitsResponse> = benefits?.map(benefit => ({
        id: benefit?.id,
        description: benefit.description,
        img: benefit.img,
        benefitType: benefit.benefit_type,
      }));

      return listBenefitsResponse;
    } catch (error) {
      return new AppError(error as string);
    }
  }
}

export default ListBenefitsService;
