import { animate, state, style, transition, trigger } from "@angular/animations";

export const fromLeft = [
  trigger('fromLeft', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    state('out', style({opacity: 0, transform: 'translateX(-20px)'})),
    transition('in => out', animate('0.2s ease-out')),
    transition('out => in', animate('0.5s ease-in'))
  ])
];