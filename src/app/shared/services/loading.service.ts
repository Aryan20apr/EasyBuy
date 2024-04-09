import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject=new BehaviorSubject<boolean>(false);
  loading$=this.loadingSubject.asObservable();
  constructor() {

   }

   loadingOn()
   {
    console.log("Loading on");
    
    this.loadingSubject.next(true);
   }

   loadingOff()
   {
    console.log("Loading Off");
    
    this.loadingSubject.next(false);
   }
}
