import { Component, Output, EventEmitter, inject } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-modal',
  imports: [ModalComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
 
  @Output()
  closeModal = new EventEmitter<void>();

  private router = inject(Router);
  

   onCancel(): void {
    this.closeModal.emit();
    this.router.navigate(['/catalogue']);
  }
}
