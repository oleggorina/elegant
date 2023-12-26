import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeArrivalsComponent } from './components/home-arrivals/home-arrivals.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { HomeValuesComponent } from './components/home-values/home-values.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeroComponent, HomeCategoriesComponent, HomeArrivalsComponent, HomeValuesComponent, HomeBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
