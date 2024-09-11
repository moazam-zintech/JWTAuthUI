import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from 'express';
import { AuthService } from '../Service/auth.service';



export const authGuard: CanActivateFn = (route, state) => {
if(inject(AuthService).isLoggedIn())
{
  return true;  
}
else{
  //inject(Router).navigate(['login'])
  return false;
}
};
