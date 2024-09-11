import { Component, OnInit } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import {  } from '@microsoft/signalr';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { Emitters } from '../../Emitters/emitters';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RegisterComponent,RouterOutlet,RouterLink,HttpClientModule,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(private http:HttpClient) {}
  authenticated=false;
  ngOnInit(): void {
  Emitters.outhEmitter.subscribe(
    (auth:boolean)=>{
       this.authenticated=auth;
    }
  )
  }
  logout():void {
    this.http.post("https://localhost:7270/api/Auth/LogOut","",{withCredentials:true}).subscribe(
      ()=>
        this.authenticated=false
    )
  }
}