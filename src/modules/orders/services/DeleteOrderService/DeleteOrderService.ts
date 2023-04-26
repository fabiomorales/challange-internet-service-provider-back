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
      await this.orderRepository.delete(id);

      return StatusCodes.NO_CONTENT;
    } catch (error) {
      return new AppError(error as string);
    }
  }
}

export default DeleteOrderService;
