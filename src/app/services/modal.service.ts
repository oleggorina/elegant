import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalIsOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  modalState$: Observable<boolean> = this.modalIsOpen.asObservable();
  modalContent: BehaviorSubject<boolean> = new  BehaviorSubject(true);
  modalContentState$: Observable<boolean> = this.modalContent.asObservable();
  
  constructor() { }
}
