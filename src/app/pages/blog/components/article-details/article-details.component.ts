import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavLinksComponent } from '../../../../components/nav-links/nav-links.component';
import { NewsletterComponent } from '../../../../components/newsletter/newsletter.component';
import { BlogInterface } from '../../../../interface/interfaces';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [NewsletterComponent, NavLinksComponent],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private changeDetectorRef = inject(ChangeDetectorRef);
  articleData!: BlogInterface;
  articleSubscription!: Subscription;

  ngOnInit(): void {
    this.articleSubscription = this.activatedRoute.data.subscribe(data => {
      this.articleData = data['data'];
      this.changeDetectorRef.detectChanges();
    })
  }

  ngOnDestroy(): void {
    if (this.articleSubscription) this.articleSubscription.unsubscribe();
  }
}
