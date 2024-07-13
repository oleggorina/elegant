import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';
import { HomeArrivalsComponent } from './components/home-arrivals/home-arrivals.component';
import { HomeArticlesComponent } from './components/home-articles/home-articles.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { HomeValuesComponent } from './components/home-values/home-values.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountOrdersComponent } from '../account/components/account-orders/account-orders.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeroComponent, HomeCategoriesComponent, HomeArrivalsComponent, HomeValuesComponent, HomeBannerComponent, HomeArticlesComponent, NewsletterComponent, FooterComponent, MatProgressSpinnerModule, AccountOrdersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
