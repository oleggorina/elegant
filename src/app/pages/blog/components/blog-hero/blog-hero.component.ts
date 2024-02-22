import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-blog-hero',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './blog-hero.component.html',
  styleUrl: './blog-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogHeroComponent {

}
