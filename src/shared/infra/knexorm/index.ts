import knex, { Knex } from 'knex';
import knexFile from '../../../config/knex';

export const knexormHelper = {
  client: null as unknown as Knex,

  async connect(params: Knex.Config): Promise<void> {
    this.client = knex(params);

    try {
      await this.client.raw('SELECT 1 + 1');
    } catch (error) {
      setTimeout(async () => await this.getInstance(), 5000);
      throw new Error(`knexormHelper Error: ${JSON.stringify(error)}`);
    }
  },

  async disconnect(): Promise<void> {
    await this.client.destroy();
    this.client = null as unknown as Knex;
  },

  async getInstance(): Promise<Knex> {
    if (this.client) return this.client;

    await this.connect(knexFile);

    return this.client;
  },
};
