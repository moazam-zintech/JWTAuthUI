import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../Model/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
private baseUrl:string="https://localhost:7295/api/Auth/"
  constructor(private http:HttpClient) {

   }
//    sendResetPasswordLink(email: string){
// return this.http.post<any>("https://localhost:7295/api/Auth/send-reset-email",email)
//    }

   sendResetPasswordLink(data: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post("https://localhost:7295/api/Auth/send-reset-email", JSON.stringify(data), { headers });
  }

   resetPassword(resetPasswordObj: ResetPassword) 
   {
    return this.http.post("https://localhost:7295/api/Auth/reset-password",resetPasswordObj);
   }
}
