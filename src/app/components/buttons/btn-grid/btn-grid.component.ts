import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-grid',
  standalone: true,
  imports: [],
  templateUrl: './btn-grid.component.html',
  styleUrl: './btn-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnGridComponent {
  @Input() active: boolean = false;
  @Input() imageSrc: string = '';
  @Input() altText: string = '';

  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.btnClick.emit();
  }
}
