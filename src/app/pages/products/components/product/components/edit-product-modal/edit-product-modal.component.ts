import { Component, Output, EventEmitter, inject } from '@angular/core';
import { ModalComponent } from '../../../../../../shared/components/modal/modal.component';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-edit-product-modal',
  imports: [ModalComponent],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.scss',
})
export class EditProductModalComponent {
  @Output()
  closeModal = new EventEmitter<void>();
  private productsService = inject(ProductsService);

  onCancel(): void {
    this.closeModal.emit();
  }
}
