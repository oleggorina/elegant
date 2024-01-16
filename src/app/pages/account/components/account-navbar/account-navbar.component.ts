import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../../../interface/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-account-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './account-navbar.component.html',
  styleUrl: './account-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountNavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router)
  private changeDetectorRef = inject(ChangeDetectorRef);

  user!: UserInterface;
  userSubscription!: Subscription;
  userId!: string | null;
  userIdSubscription!: Subscription;

  ngOnInit(): void {
    this.userIdSubscription = this.authService.userId$.subscribe(id => {
      this.userId = id;
      if (this.userId) {
        this.userSubscription = this.userService.getUser(this.userId).subscribe(user => {
          this.user = user;
          this.changeDetectorRef.detectChanges();
        })
      }
    })
  }

  ngOnDestroy(): void {
    
  }

  onMenuChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.router.navigateByUrl(`/account/${selectedValue}`);
    if (selectedValue === 'logout') {
      this.logout();
    }
  }

  @HostListener('window:resize', ['event'])
  onResize() {
    return window.innerWidth;
  }

  logout(): void {
    this.authService.logout();
  }
}
