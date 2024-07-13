import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { InformMessageComponent } from '../../../../components/inform-message/inform-message.component';
import { ValidationMessageComponent } from '../../../../components/validation-message/validation-message.component';
import { UserService } from '../../../../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [BtnPrimaryComponent, ReactiveFormsModule, ValidationMessageComponent, InformMessageComponent, MatProgressSpinnerModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDetailsComponent implements OnInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private userServrice = inject(UserService);
  private fb = inject(FormBuilder)
  detailsForm!: FormGroup;
  message!: string;

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      surname: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submitForm() {
    if (this.detailsForm.valid) {
      const { name, surname } = this.detailsForm.value;
      this.userServrice.getUserId().subscribe({
        next: (userId) => {
          this.userServrice.addDetailsInfo((userId as string), name, surname).subscribe({
            next: () => {
              this.detailsForm.reset();
              this.message = 'First and Last name successfully changed';
              this.changeDetectorRef.detectChanges();
            },
            error: (err) => console.log(err)
          })
        },
        error: (error) => console.log(error)
      })
    }
  }

  resetPassword() {
    this.userServrice.sendPasswordResetEmail().subscribe({
      next: () => {
        this.message = 'A password change request has been sent to your email';
        this.changeDetectorRef.detectChanges();
      }
    })
  }
}
