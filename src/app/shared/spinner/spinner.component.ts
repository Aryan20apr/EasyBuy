import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

loading$!:Observable<boolean>
@Input()
detectRouteTransitions=false;

@ContentChild("loading")
customLoadingIndicator:TemplateRef<any> |null=null;

constructor(public loadingService:LoadingService,private router:Router)
{
  this.loading$ = this.loadingService.loading$;
}
ngOnInit(): void {
  if(this.detectRouteTransitions)
  {
    this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              console.log("Load Start")
              this.loadingService.loadingOn();
              
            } else if (event instanceof RouteConfigLoadEnd) {
              console.log("Load End")
              this.loadingService.loadingOff();
              
            }
          })
        )
        .subscribe();
  }
}
}


