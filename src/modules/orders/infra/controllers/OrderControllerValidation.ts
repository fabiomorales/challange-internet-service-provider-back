import { ICreateOrderRequest } from '@modules/orders/domain/models/ICreateOrderRequest';
import { validation } from '@shared/infra/http/middlewares/ValidationRequest';
import * as yup from 'yup';

export const createValidation = validation(getSchema => ({
  body: getSchema<ICreateOrderRequest>(
    yup.object().shape({
      customerName: yup.string().required(),
      customerEmail: yup.string().required(),
      customerPhone: yup.string().required(),
      planId: yup.string().uuid().required(),
    }),
  ),
}));
