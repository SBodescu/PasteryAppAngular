import { Component, inject, Input } from '@angular/core';
import { CartItem } from '@shared/models/cart-item.model';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input({ required: true }) cartItem!: CartItem;
  private cartService = inject(CartService);
  onRemoveItem(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.id);
  }
}
