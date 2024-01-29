import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../interface/interfaces';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AccountNavbarComponent } from './components/account-navbar/account-navbar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccountNavbarComponent, RouterOutlet, AsyncPipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute)
  private changeDetectorRef = inject(ChangeDetectorRef);
  private userService = inject(UserService);
  userData!: UserInterface;
  userDataSubscription!: Subscription;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.userDataSubscription = this.userService.getUser(userId).subscribe((data) => {
          this.userData = data;
          this.userService.userIdSubject.next(userId);
          this.changeDetectorRef.detectChanges();
        })
      }
    })
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) this.userDataSubscription.unsubscribe();
  }

  
}
