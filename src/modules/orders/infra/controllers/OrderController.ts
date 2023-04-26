import { ICreateOrderRequest } from '@modules/orders/domain/models/ICreateOrderRequest';
import CreateOrderService from '@modules/orders/services/CreateOrderService/CreateOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OrderController {
  public async create(request: Request<unknown, unknown, ICreateOrderRequest>, response: Response): Promise<Response> {
    const { customerEmail, customerName, customerPhone, planId } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_email: customerEmail,
      customer_name: customerName,
      customer_phone: customerPhone,
      plan_id: planId,
    });

    return response.json(order);
  }
}
