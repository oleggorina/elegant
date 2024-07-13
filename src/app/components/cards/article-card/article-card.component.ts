import { LinkComponent } from '../../buttons/link/link.component';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { BlogInterface } from '../../../interface/interfaces';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [LinkComponent, RouterLink],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent {
  private router = inject(Router);
 @Input() article!: BlogInterface;

 goToArticle(articleId: string) {
  this.router.navigateByUrl(`article-details/${articleId}`)
 }
}
