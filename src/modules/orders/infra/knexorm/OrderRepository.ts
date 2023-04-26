import { IOrder } from '@modules/orders/domain/models/IOrder';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import { knexormHelper } from '@shared/infra/knexorm';
import { Knex } from 'knex';

class OrderRepository implements IOrderRepository {
  private ormRepository: Knex;

  constructor() {
    this.ormRepository = knexormHelper.client;
  }

  public async findAll(): Promise<Array<IOrder>> {
    return await this.ormRepository('orders').select('*');
  }

  public async findById(id: string): Promise<IOrder | undefined> {
    return await this.ormRepository('orders').select('*').where('id', id).first();
  }

  public async create(order: Partial<IOrder>): Promise<IOrder> {
    const [orderCreated] = await this.ormRepository('orders').insert(order).returning('*');

    return orderCreated;
  }

  public async update(id: string, order: Partial<IOrder>): Promise<IOrder> {
    const [orderUpdated] = await this.ormRepository('orders').where({ id }).update(order).returning('*');

    return orderUpdated;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository('orders').where({ id }).del();
  }
}

export default OrderRepository;
