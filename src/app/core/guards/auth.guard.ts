import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('authToken');

  if(token){
    console.log("token", token)
    return true;
  }else{
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
