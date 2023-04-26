export interface IOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  plan_id: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
