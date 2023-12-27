import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '../../buttons/link/link.component';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent {

}
