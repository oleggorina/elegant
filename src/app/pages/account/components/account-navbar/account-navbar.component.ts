import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, OnInit } from '@angular/core';
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
export class AccountNavbarComponent implements OnInit {
  private router = inject(Router)
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private changeDetectorRef = inject(ChangeDetectorRef)
  user$!: Observable<UserInterface | null>;
  userId!: string | undefined;

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.user$.subscribe((user) => {
      this.userId = user?.id;
      this.changeDetectorRef.detectChanges();
    })
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.item(0);
    if (file) {
      this.userService.getUserId().subscribe({
        next: (userId) => {
          if (userId) {
            this.userService.addUserImage(userId, file).subscribe({
              next: (res) => console.log('User image uploaded successfully', res),
              error: (er) => console.log(er)
            })
          }
        }
      })
    }
  }

  onMenuChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.router.navigateByUrl(`/account/${this.userId}/${selectedValue}`);
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
