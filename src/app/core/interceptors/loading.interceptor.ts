import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { finalize } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';

export const SkipLoading = 
  new HttpContextToken<boolean>(() => false);
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService=inject(LoadingService)


  // Check for a custom attribute 
    // to avoid showing loading spinner
    if (req.context.get(SkipLoading)) {
      // Pass the request directly to the next handler
      return next(req);
    }

    // Turn on the loading spinner
   loadingService.loadingOn();

    return next(req).pipe(
      finalize(() => {
        // Turn off the loading spinner
        loadingService.loadingOff();
      })
    );
  };