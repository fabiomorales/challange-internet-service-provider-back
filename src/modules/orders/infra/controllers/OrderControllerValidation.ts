import { ICreateOrderRequest } from '@modules/orders/domain/models/ICreateOrderRequest';
import { IDeleteOrderRequest } from '@modules/orders/domain/models/IDeleteOrderRequest';
import { IUpdateOrderRequest } from '@modules/orders/domain/models/IUpdateOrderRequest';
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

export const updateValidation = validation(getSchema => ({
  body: getSchema<IUpdateOrderRequest>(
    yup.object().shape({
      id: yup.string().uuid().required(),
      status: yup.string().required(),
    }),
  ),
}));

export const deleteValidation = validation(getSchema => ({
  params: getSchema<IDeleteOrderRequest>(
    yup.object().shape({
      id: yup.string().uuid().required(),
    }),
  ),
}));
