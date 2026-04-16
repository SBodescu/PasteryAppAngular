import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { Product } from './product.model';
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../cart/cart-item/cart-item.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product',
  imports: [CardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  @Input({ required: true }) product!: Product;
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  role: string = '';
  isAuthenticated: boolean = false;

  ngOnInit(): void {
    const subscription = this.authService.currentUser$.subscribe({
      next: (data) => {
        this.role = data?.user_metadata?.['role'] || '';
        this.isAuthenticated = !!data?.role || !!this.role;
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onAddtoCart(): void {
    if (!this.product) {
      return;
    }

    const cartItem: CartItem = {
      id: this.product.id.toString(),
      name: this.product.name,
      price: this.product.price,
      image_url: this.product.image_url,
      quantity: 1,
    };

    this.cartService.addToCart(cartItem);
  }
}
