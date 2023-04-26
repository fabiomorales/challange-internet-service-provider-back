import { IUpdateOrder } from '@modules/orders/domain/models/IUpdateOrder';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(params: IUpdateOrder): Promise<number | AppError> {
    try {
      const order = await this.orderRepository.findById(params.id);

      if (!order) {
        throw new AppError('No order with this id found', StatusCodes.NO_CONTENT);
      }

      await this.orderRepository.update(params.id, { ...params });

      return StatusCodes.CREATED;
    } catch (error) {
      return new AppError(error as string);
    }
  }
}

export default UpdateOrderService;
