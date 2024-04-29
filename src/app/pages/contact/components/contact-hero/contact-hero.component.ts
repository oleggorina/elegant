import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '../../../../components/buttons/link/link.component';
import { NavLinksComponent } from '../../../../components/nav-links/nav-links.component';

@Component({
  selector: 'app-contact-hero',
  standalone: true,
  imports: [NavLinksComponent, LinkComponent, RouterLink],
  templateUrl: './contact-hero.component.html',
  styleUrl: './contact-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactHeroComponent {

}
