import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartService } from './services/cart.service';
import { CartItem } from './models/cart-item.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  cartItems: CartItem[] = [];
  totalCartValue = 0;

  ngOnInit(): void {
    const subscription = this.cartService.cartObservable$.subscribe({
      next: (items: CartItem[]) => {
        this.cartItems = items;
        this.totalCartValue = this.cartService.getTotalPrice();
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onFinalizeOrder() {}
}
