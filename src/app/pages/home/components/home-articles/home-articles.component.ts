import { LinkComponent } from '../../../../components/buttons/link/link.component';
import { ArticleCardComponent } from '../../../../components/cards/article-card/article-card.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { BlogService } from '../../../../services/blog.service';
import { BlogInterface } from '../../../../interface/interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-articles',
  standalone: true,
  imports: [LinkComponent, ArticleCardComponent, RouterLink],
  templateUrl: './home-articles.component.html',
  styleUrl: './home-articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeArticlesComponent implements OnInit, OnDestroy {
  private blogService = inject(BlogService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  articleData!: BlogInterface[];
  articleSubscription!: Subscription;

  ngOnInit(): void {
    this.articleSubscription = this.blogService.getArticles().pipe(
      map(articles => {
        if (!Array.isArray(articles)) {
          articles = Object.values(articles);
        } if (Array.isArray(articles)) {
          return articles.slice(-3);
        }        
        return [];
      })
    )
    .subscribe({
      next: (articles) => {
        this.articleData = articles;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => console.log(error)      
    })
  }

  ngOnDestroy(): void {
    if (this.articleSubscription) this.articleSubscription.unsubscribe();
  }
}
