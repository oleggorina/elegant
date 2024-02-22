import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavLinksComponent {
  private router = inject(Router);
  @Input() links: {link: string, routerLink: string}[] = [];

  navigateTo(link: string): void {
    this.router.navigateByUrl(link);
  }
}
