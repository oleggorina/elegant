import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, Subscription, switchMap, take } from 'rxjs';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { InformMessageComponent } from '../../../../components/inform-message/inform-message.component';
import { ValidationMessageComponent } from '../../../../components/validation-message/validation-message.component';
import { UserInterface } from '../../../../interface/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [BtnPrimaryComponent, ReactiveFormsModule, ValidationMessageComponent, InformMessageComponent],
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
      const {name, surname} = this.detailsForm.value;
      const userId = this.userServrice.userIdSubject.value;
      this.userServrice.addDetailsInfo((userId as string), name, surname).subscribe({
        next: () => {
          this.detailsForm.reset();
          this.message = 'First and Last name successfully changed';
          this.changeDetectorRef.detectChanges();
        },
        error: (err) => console.log(err)
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
