import { IBenefit } from '@modules/plans/domain/models/IBenefit';
import { ICreatePlanRequest } from '@modules/plans/domain/models/ICreatePlanRequest';
import { IDeletePlanRequest } from '@modules/plans/domain/models/IDeletePlanRequest';
import { IUpdatePlanRequest } from '@modules/plans/domain/models/IUpdatePlanRequest';
import { validation } from '@shared/infra/http/middlewares/ValidationRequest';
import * as yup from 'yup';

export const createValidation = validation(getSchema => ({
  body: getSchema<ICreatePlanRequest>(
    yup.object().shape({
      name: yup.string().required(),
      speed: yup.number().required(),
      speedType: yup.string().required(),
      price: yup.number().required(),
      bestPlan: yup.boolean().required(),
      benefits: yup.array().required(),
    }),
  ),
}));

export const updateValidation = validation(getSchema => ({
  body: getSchema<IUpdatePlanRequest>(
    yup.object().shape({
      plan: yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
        speed: yup.number().required(),
        speedType: yup.string().required(),
        price: yup.number().required(),
        bestPlan: yup.boolean().required(),
      }),
      includeBenefits: yup.array<Array<IBenefit['id']>>().required(),
      excludeBenefits: yup.array<Array<IBenefit['id']>>().required(),
    }),
  ),
}));

export const deleteValidation = validation(getSchema => ({
  params: getSchema<IDeletePlanRequest>(
    yup.object().shape({
      id: yup.string().uuid().required(),
    }),
  ),
}));
