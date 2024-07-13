import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ModalService } from '../../../../services/modal.service';
import { UserService } from '../../../../services/user.service';
import { BtnPrimaryComponent } from '../../../buttons/btn-primary/btn-primary.component';
import { InformMessageComponent } from '../../../inform-message/inform-message.component';
import { ValidationMessageComponent } from '../../../validation-message/validation-message.component';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [InformMessageComponent, AsyncPipe, BtnPrimaryComponent, ReactiveFormsModule, HttpClientModule, ValidationMessageComponent],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent implements OnInit {
  private modalService = inject(ModalService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private userService = inject(UserService);
  signInForm!: FormGroup;
  loginErrorMessage: string | null = null;

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  submitForm(): void {
    if (this.signInForm.valid) {
      const {email, password} = this.signInForm.value;
      this.authService.login(email, password)
      .subscribe({
        next: (response: any) => {
          this.authService.setToken(response.idToken);
          this.modalService.modalIsOpen.next(false);
          this.userService.setUserId(response.localId);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  changeContent() {
    this.modalService.modalContent.next(true);
  }
}
