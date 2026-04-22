import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { ModalComponent } from '../../../../../../shared/components/modal/modal.component';
import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product-modal',
  imports: [ModalComponent, FormsModule],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.scss',
})
export class EditProductModalComponent {
  @Input({ required: true })
  formTitle!: string;
  @Output()
  closeModal = new EventEmitter<void>();
  categories = ['Cakes', 'Desserts', 'Bakery'];
  productAdded: Product = {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    category: '',
    image_url: '',
    price: 0,
    isDeleted: false,
  };
  private productsService = inject(ProductsService);

  onSubmit() {
    this.productsService.addProduct(this.productAdded).subscribe({
      next: () => console.log('Product added'),
    });
    this.closeModal.emit();
  }

  onCancel(): void {
    this.closeModal.emit();
  }
}
