import { IListOrdersResponse } from '@modules/orders/domain/models/IListOrdersResponse';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(): Promise<Array<IListOrdersResponse> | AppError> {
    try {
      const orders = await this.orderRepository.findAll();

      const listOrdersResponse: Array<IListOrdersResponse> = orders?.map(order => ({
        id: order?.id,
        customerEmail: order?.customer_email,
        customerName: order?.customer_name,
        customerPhone: order?.customer_phone,
        planId: order?.plan_id,
        status: order?.status,
      }));

      return listOrdersResponse;
    } catch (error) {
      return new AppError(error as string);
    }
  }
}

export default ListOrderService;
