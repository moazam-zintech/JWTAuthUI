import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string ="https://localhost:7295/api/Auth/GetAllUsers";

  constructor(private http: HttpClient,private router: Router) { }
   getAllUsers(){
    return this.http.get(`${this.baseUrl}`)
  }
}
