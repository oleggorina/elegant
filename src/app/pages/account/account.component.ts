import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../interface/interfaces';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AccountNavbarComponent } from './components/account-navbar/account-navbar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccountNavbarComponent, RouterOutlet],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  userId!: string | null;
  userIdSubscription!: Subscription;
  user!: UserInterface;
  userSubscription!: Subscription;

  ngOnInit(): void {
    this.userIdSubscription = this.authService.userId$.subscribe(id => {
      this.userId = id;
      if (this.userId) {
        this.userSubscription = this.userService.getUser(this.userId).subscribe(data => {
          this.user = data;
          this.changeDetectorRef.detectChanges();   
        })
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
  
  logout() {
    this.authService.logout();
  }
}
