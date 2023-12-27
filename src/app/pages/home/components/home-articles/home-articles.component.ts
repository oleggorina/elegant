import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '../../../../components/buttons/link/link.component';
import { ArticleCardComponent } from '../../../../components/cards/article-card/article-card.component';

@Component({
  selector: 'app-home-articles',
  standalone: true,
  imports: [LinkComponent, ArticleCardComponent],
  templateUrl: './home-articles.component.html',
  styleUrl: './home-articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeArticlesComponent {

}
