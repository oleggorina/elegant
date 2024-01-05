import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [AsyncPipe, SignUpFormComponent, SignInFormComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {
  modalService = inject(ModalService);
  authService = inject(AuthService);

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.modalService.modalIsOpen.next(false);
    }
  }

  closeModal() {
    this.modalService.modalIsOpen.next(false);
  }
}
