import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ModalService } from '../../../../services/modal.service';
import { BtnPrimaryComponent } from '../../../buttons/btn-primary/btn-primary.component';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [BtnPrimaryComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent {
  modalService = inject(ModalService);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  signInForm!: FormGroup;

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  submitForm(): void {
    if (this.signInForm.valid) {
      const {email, password} = this.signInForm.value;
      this.authService.login(email, password).subscribe(() => {
        this.modalService.modalIsOpen.next(false);
        this.router.navigateByUrl('account');
      })
    }
  }

  changeContent() {
    this.modalService.modalContent.next(true);
  }
}
