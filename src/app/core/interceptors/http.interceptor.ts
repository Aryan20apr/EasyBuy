import { HttpInterceptorFn } from '@angular/common/http';
import { ACCESS_TOKEN } from '../../AppConstants';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  var customRequest=req;
  debugger;
  if(!req.url.endsWith('/login') && !req.url.endsWith('/register') )
    {
      const accessToken = localStorage.getItem(ACCESS_TOKEN) || '';
const header = {"Authorization": "Bearer " + accessToken};
  
   customRequest= req.clone({setHeaders:header})
    }
  return next(customRequest);
};
