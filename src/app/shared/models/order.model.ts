import { CartItem } from './cart-item.model';

export type Order = {
  id: string;
  user_id: string;
  items: CartItem[];
  total_price: number;
  status: string;
};
