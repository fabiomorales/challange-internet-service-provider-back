import { ICreateOrderRequest } from '@modules/orders/domain/models/ICreateOrderRequest';
import { IDeleteOrderRequest } from '@modules/orders/domain/models/IDeleteOrderRequest';
import { IUpdateOrderRequest } from '@modules/orders/domain/models/IUpdateOrderRequest';
import CreateOrderService from '@modules/orders/services/CreateOrderService/CreateOrderService';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService/DeleteOrderService';
import ListOrderService from '@modules/orders/services/ListOrderService/ListOrderService';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService/UpdateOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OrderController {
  public async index(_request: Request<unknown, unknown, unknown>, response: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrderService);

    const orders = await listOrders.execute();

    return response.json(orders);
  }

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

  public async update(request: Request<unknown, unknown, IUpdateOrderRequest>, response: Response): Promise<Response> {
    const { status, id } = request.body;

    const updateOrder = container.resolve(UpdateOrderService);

    const order = await updateOrder.execute({
      id,
      status,
    });

    return response.json(order);
  }

  public async delete(request: Request<IDeleteOrderRequest>, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateOrder = container.resolve(DeleteOrderService);

    const order = await updateOrder.execute(id);

    return response.json(order);
  }
}
