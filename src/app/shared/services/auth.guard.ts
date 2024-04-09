import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CUSTOMER, CUSTOMER_TOKEN, ROLE, SELLER } from '../../AppConstants';


export const adminAuthGuardBeforeLogin: CanActivateFn = (route, state) => {
  
  const router:Router=inject(Router);

  let role=sessionStorage.getItem('role')

  if(role=='admin')
  {
    router.navigate(['/admin-dashboard']);
    return false;
  }
  else
  {
    return true;
  }};

export const adminAuthGuardAfterLogin: CanActivateFn = (route, state) => {


  const router:Router=inject(Router)
  let role=sessionStorage.getItem(ROLE)
  if(role=='admin')
  {
    return true;
  }
  else
  {
    router.navigate(['/admin-login']);
      return false;
  }
}

export const sellerBuyerAuthGuardLogin: CanActivateFn = (route, state) => {

  const router:Router=inject(Router)
  let role=localStorage.getItem(ROLE)
  console.log("sellerBuyerAuthGuardLogin:",role)
  if(role=='SELLER')
  {
    router.navigate(['/seller-dashboard']);
      return false;
  }
  else if(role=='CUSTOMER')
  {
    router.navigate(['/buyer-dashboard']);
      return false;
  }
  else
  {
    return true;
  }
}

export const sellerAuthGuard: CanActivateFn = (route, state) => {

  const router:Router=inject(Router)
  let role=localStorage.getItem(ROLE);
debugger;
  console.log("seller auth guard:",role)
  if(role==SELLER)
  {
    return true;
  }
  else
  {
    router.navigate(['/sign-in']);
    return false;
  }
}


export const buyerAuthGuard: CanActivateFn = (route, state) => {

  const router:Router=inject(Router)
  let role=localStorage.getItem(ROLE)
  if (role == CUSTOMER) {
    return true;
  } else {
    router.navigate(["/sign-in"]);
    return false;
  }
}
