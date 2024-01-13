import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { ValidationMessageComponent } from '../../../../components/validation-message/validation-message.component';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [BtnPrimaryComponent, ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDetailsComponent implements OnInit {
  fb = inject(FormBuilder)
  detailsForm!: FormGroup;
  
  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      surname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      oldPassword: [''],
      newPassword: [''],
      rptPassword: ['']
    })
  }

  submitForm() {

  }
}
