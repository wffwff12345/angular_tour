import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { store } from './store/store.component';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){
  }
  state:any;
  canActivate(): boolean {
    /* console.log('路由守卫');
    this.state = store.getState();
    const token = this.state.token;
    console.log('token.payload');
    console.log(typeof (token));
    console.log(token.payload);
    console.log('token');
    console.log(typeof (token));
    console.log(token);
    console.log("localstorage");
    console.log(localStorage.getItem("persist:root"));
    const persist=localStorage.getItem("persist:root");
    if (token.payload&&persist) {
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    } */
    console.log('路由守卫');
    const token=localStorage.getItem("token");
    if(!!token){
      
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  
}}


