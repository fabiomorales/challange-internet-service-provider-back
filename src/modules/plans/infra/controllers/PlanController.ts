import { ICreatePlanRequest } from '@modules/plans/domain/models/ICreatePlanRequest';
import { IDeletePlanRequest } from '@modules/plans/domain/models/IDeletePlanRequest';
import { IUpdatePlanRequest } from '@modules/plans/domain/models/IUpdatePlanRequest';
import CreatePlanService from '@modules/plans/services/CreatePlanService/CreatePlanService';
import DeletePlanService from '@modules/plans/services/DeletePlanService/DeletePlanService';
import ListPlansService from '@modules/plans/services/ListPlansService/ListPlansService';
import UpdatePlanService from '@modules/plans/services/UpdatePlanService/UpdatePlanService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PlanController {
  public async index(_request: Request<unknown, unknown, unknown>, response: Response): Promise<Response> {
    const listPlans = container.resolve(ListPlansService);

    const plans = await listPlans.execute();

    return response.json(plans);
  }

  public async create(request: Request<unknown, unknown, ICreatePlanRequest>, response: Response): Promise<Response> {
    const { name, price, bestPlan, speed, speedType, benefits } = request.body;

    const createPlan = container.resolve(CreatePlanService);

    const plan = await createPlan.execute({
      plan: {
        name,
        price,
        speed,
        speed_type: speedType,
        best_plan: bestPlan,
      },
      benefits,
    });

    return response.json(plan);
  }

  public async update(request: Request<unknown, unknown, IUpdatePlanRequest>, response: Response): Promise<Response> {
    const { plan, includeBenefits, excludeBenefits } = request.body;

    const updatePlan = container.resolve(UpdatePlanService);

    const updatedPlan = await updatePlan.execute({
      plan: {
        id: plan.id,
        name: plan?.name,
        speed: plan?.speed,
        speed_type: plan.speedType,
        price: plan.price,
        best_plan: plan.bestPlan,
      },
      includeBenefits,
      excludeBenefits,
    });

    return response.json(updatedPlan);
  }

  public async delete(request: Request<IDeletePlanRequest>, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePlan = container.resolve(DeletePlanService);

    const deletedPlan = await deletePlan.execute(id);

    return response.json(deletedPlan);
  }
}
