import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import AppError from '@shared/errors/AppError';
import { OrderStautsEnum } from '@shared/utils/constants';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(params: ICreateOrder): Promise<number | AppError> {
    try {
      await this.orderRepository.create({ ...params, status: OrderStautsEnum.IN_PROGRESS });

      return StatusCodes.CREATED;
    } catch (error) {
      return new AppError(error as string);
    }
  }
}

export default CreateOrderService;
