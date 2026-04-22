import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Product } from '../../models/product.model';
import { CartService } from '../../../cart/services/cart.service';
import { CartItem } from '../../../cart/models/cart-item.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';

@Component({
  selector: 'app-product',
  imports: [
    CardComponent,
    DeleteProductModalComponent,
    EditProductModalComponent,
  ],
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
  showDeleteModal: boolean = false;
  showEditModal: boolean = false;

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

  onDeleteClick() {
    this.showDeleteModal = true;
  }

  onEditClick() {
    this.showEditModal = true;
  }
}
