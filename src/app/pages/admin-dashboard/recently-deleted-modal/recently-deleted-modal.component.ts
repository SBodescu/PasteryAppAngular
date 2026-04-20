import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Product } from '../../products/product/product.model';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-recently-deleted-modal',
  imports: [ModalComponent],
  templateUrl: './recently-deleted-modal.component.html',
  styleUrl: './recently-deleted-modal.component.scss',
})
export class RecentlyDeletedModalComponent {
  @Input({ required: true })
  deletedProducts!: Product[];
  @Output()
  closeModal = new EventEmitter<void>();
  @Output()
  productRestored = new EventEmitter<void>();

  private productsService = inject(ProductsService);

  onCancel(): void {
    this.closeModal.emit();
  }

  onRestore(product: Product): void {
    this.productsService.restoreProduct(product).subscribe({
      next: () => {
        console.log('Product restored:', product.name);
        this.productRestored.emit();
      },
      error: (error) => {
        console.error('Error restoring product:', error);
      },
    });
  }
}
