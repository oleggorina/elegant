import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { UserInterface } from '../../../../interface/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-account-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './account-navbar.component.html',
  styleUrl: './account-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountNavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router)
  private changeDetectorRef = inject(ChangeDetectorRef);

  user$!: Observable<UserInterface | null>;
  userIdSubscription!: Subscription;

  ngOnInit(): void {
    this.userIdSubscription = this.authService.userId$.subscribe(id => {
      if (id) {
        this.userService.getUserState().subscribe(user => {
          this.user$ = of(user);
          this.changeDetectorRef.detectChanges();
        })
      }
    })
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
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
