import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactHeroComponent } from './components/contact-hero/contact-hero.component';
import { ContactValuesComponent } from './components/contact-values/contact-values.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactHeroComponent, ContactFormComponent, ContactValuesComponent, MatProgressSpinnerModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {

}
