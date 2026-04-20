import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { ProductsService } from '../../../products.service';
import { Product } from '../../product.model';

@Component({
  selector: 'app-delete-product-modal',
  imports: [],
  templateUrl: './delete-product-modal.component.html',
  styleUrl: './delete-product-modal.component.scss',
})
export class DeleteProductModalComponent {
  @Input({ required: true })
  product!: Product;
  @Output()
  closeModal = new EventEmitter<void>();
  private productsService = inject(ProductsService);

  onCancel(): void {
    this.closeModal.emit();
  }

  onConfirm(): void {
    this.productsService.deleteProduct(this.product).subscribe({
      next: () => {
        console.log(
          'Product with name:' + this.product.name + 'has been deleted',
        );
        this.closeModal.emit();
      },
    });
  }
}
