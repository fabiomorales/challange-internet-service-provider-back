export interface IPlan {
  id: string;
  name: string;
  speed: number;
  speed_type: string;
  price: number;
  best_plan: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
