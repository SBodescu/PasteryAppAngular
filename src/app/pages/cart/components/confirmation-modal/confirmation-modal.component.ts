import { Component, Input, inject } from '@angular/core';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-modal',
  imports: [ModalComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  @Input({ required: true })
  isOpened!: boolean;

  private router = inject(Router);
  onCloseModal() {
    this.isOpened = false;
    this.router.navigate(['/catalogue']);
  }
}
