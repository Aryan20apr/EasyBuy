import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


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
  let role=sessionStorage.getItem("role")
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
  let role=sessionStorage.getItem('role')
  console.log("sellerBuyerAuthGuardLogin:",role)
  if(role=='seller')
  {
    router.navigate(['/seller-dashboard']);
      return false;
  }
  else if(role=='buyer')
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
  let role=sessionStorage.getItem('role');

  console.log("seller auth guard:",role)
  if(role=='seller')
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
  let role = sessionStorage.getItem("role")
  if (role == 'buyer') {
    return true;
  } else {
    router.navigate(["/sign-in"]);
    return false;
  }
}
