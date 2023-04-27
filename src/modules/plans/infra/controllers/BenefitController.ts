import ListBenefitsService from '@modules/plans/services/ListBenefitsService/ListBenefitsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class BenefitController {
  public async index(_request: Request<unknown, unknown, unknown>, response: Response): Promise<Response> {
    const listBenefits = container.resolve(ListBenefitsService);

    const benefits = await listBenefits.execute();

    return response.json(benefits);
  }
}
