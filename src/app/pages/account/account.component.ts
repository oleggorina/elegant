import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../interface/interfaces';
import { UserService } from '../../services/user.service';
import { AccountNavbarComponent } from './components/account-navbar/account-navbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccountNavbarComponent, RouterOutlet, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit, OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private userService = inject(UserService);
  userData!: UserInterface;
  userDataSubscription!: Subscription;
  userIdSubscription!: Subscription;

  ngOnInit(): void {
    this.userIdSubscription = this.userService.getUserId().subscribe((userId) => {
      if (userId) {
        this.userDataSubscription = this.userService.getUser(userId).subscribe({
          next: (user) => {
            this.userData = user;
            this.changeDetectorRef.detectChanges();
          },
          error: (error) => console.log(error)          
        })
      }
    })
  }

  ngOnDestroy(): void {
    if(this.userIdSubscription) this.userIdSubscription.unsubscribe();
    if (this.userDataSubscription) this.userDataSubscription.unsubscribe();
  }

  
}
