import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { ModalService } from '../../../../services/modal.service';
import { BtnPrimaryComponent } from '../../../buttons/btn-primary/btn-primary.component';
import { ValidationMessageComponent } from '../../../validation-message/validation-message.component';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [BtnPrimaryComponent, ReactiveFormsModule, HttpClientModule, ValidationMessageComponent],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent implements OnInit {
  modalService = inject(ModalService);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  signUpForm!: FormGroup;

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      surname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      isChecked: ['', [Validators.required]]
    })
  }

  submitForm(): void {
    if (this.signUpForm.valid) {
      const {name, surname, email, password} = this.signUpForm.value;
      this.authService.addUser(email, password, name, surname)
      .subscribe({
        next: (res) => {
          this.modalService.modalContent.next(false);
        },
        error: (error) => console.log('error: ', error),
        complete: () => console.log('Complete')
      })
      // .subscribe({
      //   next: (user) => {
      //   console.log(user);
      //   this.modalService.modalIsOpen.next(false);
      // },
      // error: (e) => {
      //   console.log('Subscription error:', e);
      // },
      // complete: () => console.info('User registered')
      // })
    }
  }

  changeContent() {
    this.modalService.modalContent.next(false);
  }
}
