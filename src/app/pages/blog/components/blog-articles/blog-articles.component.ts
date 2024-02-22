import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { BtnLoadComponent } from '../../../../components/buttons/btn-load/btn-load.component';
import { BlogInterface } from '../../../../interface/interfaces';
import { BlogService } from '../../../../services/blog.service';

@Component({
  selector: 'app-blog-articles',
  standalone: true,
  imports: [BtnLoadComponent, RouterLink, NgClass, FormsModule],
  templateUrl: './blog-articles.component.html',
  styleUrl: './blog-articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogArticlesComponent implements OnInit, OnDestroy {
  private blogService = inject(BlogService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  articlesData!: BlogInterface[];
  articlesDataSubscription!: Subscription;
  filteredArticles!: BlogInterface[];
  currentPage = 1;
  articlesPerPage = 6;
  totalArticles = 0;
  gridLayout: string = 'grid3x3';
  activeFilter: string = 'grid3x3';
  selectedOption: string = '';
  
  
  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    this.articlesDataSubscription = this.blogService.getArticles().subscribe(data => {
      this.totalArticles = Object.keys(data).length;
      this.articlesData = Object.values(data).slice(startIndex, startIndex + this.articlesPerPage);
      this.applyFilter();
      this.changeDetectorRef.detectChanges();
    })
  }

  loadMore(): void {
    this.currentPage++;
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    this.blogService.getArticles().subscribe(data => {
      const newArticles = Object.values(data).slice(startIndex, startIndex + this.articlesPerPage);
      this.articlesData = this.articlesData.concat(newArticles);
      this.changeDetectorRef.detectChanges();
    })
  }

  applyFilter(): void {
    if (this.selectedOption === 'date') {
      this.filteredArticles = this.articlesData.slice().sort((a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
    } else {
      this.filteredArticles = this.articlesData;
    }
  }

  articlesAreShowed(): boolean {
    return !!this.articlesData && this.articlesData.length < this.totalArticles;
  }

  setActiveFilter(filter: string): void {
    this.activeFilter = filter === this.activeFilter ? '' : filter;
  }

  changeGridLayout(layout: string): void {
    this.gridLayout = layout;
  }

  ngOnDestroy(): void {
    if(this.articlesDataSubscription) this.articlesDataSubscription.unsubscribe();
  }
}
