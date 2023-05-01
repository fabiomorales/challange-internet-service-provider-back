import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('customer_name').notNullable();
    table.string('customer_email').notNullable();
    table.string('customer_phone').notNullable();
    table.uuid('plan_id').unsigned().references('id').inTable('plans').notNullable().onDelete('CASCADE');
    table.string('status').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders');
}
