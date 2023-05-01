import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(id: string): Promise<number | AppError> {
    try {
      const order = await this.orderRepository.findById(id);

      if (!order) {
        throw new AppError('No order with this id found', StatusCodes.NO_CONTENT);
      }

      await this.orderRepository.delete(id);

      return StatusCodes.NO_CONTENT;
    } catch (error) {
      return new AppError(error as string);
    }
  }
}

export default DeleteOrderService;
