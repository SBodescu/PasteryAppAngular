import { CartItem } from '../../cart/models/cart-item.model';

export type Order = {
  id: string;
  user_id: string;
  items: CartItem[];
  total_price: number;
  status: string;
};
