import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';
import { BlogArticlesComponent } from './components/blog-articles/blog-articles.component';
import { BlogHeroComponent } from './components/blog-hero/blog-hero.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogHeroComponent, BlogArticlesComponent, NewsletterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {

}
