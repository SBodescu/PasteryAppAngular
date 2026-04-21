import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartService } from './services/cart.service';
import { CartItem } from './models/cart-item.model';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../orders/orders.service';
import { Order } from '../orders/order/order.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private orderService = inject(OrdersService);
  private destroyRef = inject(DestroyRef);
  private order!: Order;

  cartItems: CartItem[] = [];
  totalCartValue = 0;
  userId: string = '';

  ngOnInit(): void {
    const authSubscription = this.authService.currentUser$.subscribe({
      next: (user) => (this.userId = user.id),
    });
    const subscription = this.cartService.cartObservable$.subscribe({
      next: (items: CartItem[]) => {
        this.cartItems = items;
        this.totalCartValue = this.cartService.getTotalPrice();
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      authSubscription.unsubscribe();
    });
  }

  onFinalizeOrder() {
    this.order = {
      id: crypto.randomUUID(),
      user_id: this.userId,
      items: this.cartItems,
      total_price: this.totalCartValue,
      status: 'pending',
    };
    this.orderService.addOrder(this.order).subscribe({
      next: (order) => console.log('Order sent'),
    });
  }
}
