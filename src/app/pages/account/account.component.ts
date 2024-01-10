import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../interface/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private changeDetectorRef = inject(ChangeDetectorRef);
  userId!: string | null;
  userIdSubscription!: Subscription;
  user!: UserInterface;
  userSubscription!: Subscription;

  ngOnInit(): void {
    this.userIdSubscription = this.authService.userId$.subscribe(id => {
      this.userId = id;
      if (this.userId) {
        this.userSubscription = this.authService.getUser(this.userId).subscribe(data => {
          this.user = data;
          console.log(this.user);
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
