import {
  Component,
  Output,
  EventEmitter,
  inject,
  Input,
  OnInit,
} from '@angular/core';
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
export class EditProductModalComponent implements OnInit {
  @Input()
  product?: Product;
  @Output()
  closeModal = new EventEmitter<void>();
  categories = ['Cakes', 'Desserts', 'Bakery'];
  private productsService = inject(ProductsService);

  formTitle!: string;
  formData!: Product;
  isEditMode: boolean = false;

  ngOnInit(): void {
    if (this.product) {
      this.formTitle = 'Edit';
      this.isEditMode = true;
      this.formData = { ...this.product };
    } else {
      this.formTitle = 'Add';
      this.isEditMode = false;
      this.formData = {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        category: '',
        image_url: '',
        price: 0,
        isDeleted: false,
      };
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.productsService.editProduct(this.formData).subscribe({
        next: () => {
          console.log('Product eddited');
          this.closeModal.emit();
        },
      });
    } else {
      this.productsService.addProduct(this.formData).subscribe({
        next: () => {
          console.log('Product added');
          this.closeModal.emit();
        },
      });
    }
  }

  onCancel(): void {
    this.closeModal.emit();
  }
}
