import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  setActiveFilter(filter: string, activeFilter: string): string {
    return filter === activeFilter ? '' : filter;
  }

  changeGridLayout(layout: string): string {
    return layout
  }
}
