import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class AccountDetailsComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  fb = inject(FormBuilder)
  detailsForm!: FormGroup;
  user$!: Observable<UserInterface | null>;
  userIdSubscription!: Subscription;
  message: string | null = null;
  
  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      surname: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.userIdSubscription = this.authService.userId$.subscribe(id => {
      if(id) {
        this.user$ = this.userService.getUser(id);
        this.changeDetectorRef.detectChanges();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
  }

  submitForm() {
    // if (this.detailsForm.valid) {
    //   const {name, surname} = this.detailsForm.value;
    //   this.user$.pipe(
    //     take(1),
    //     switchMap(user => {
    //       if(user) {
    //         return this.userService.addDetailsInfo(user.id, name, surname)
    //       }
    //       return EMPTY
    //     })
    //   ).subscribe(() => {
    //     this.detailsForm.reset();
    //   })
    // }
  }

  resetPassword() {
    this.user$.subscribe((user) => {
      if (user) {
        this.userService.sendPasswordResetEmail(user.email).subscribe(
          
        )
      }
    })
  }
}
