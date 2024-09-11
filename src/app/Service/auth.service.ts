import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7295/api/Auth/';
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
  }
  signIn(userObj: any) {
    return this.http.post(`${this.baseUrl}Login`, userObj);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/Home']);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token ');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;

    console.log(jwtHelper.decodeToken(token));

    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name;
    }
  }
  getRoleFromToken() {
    if(this.userPayload)
    return this.userPayload.role;
  }
}
