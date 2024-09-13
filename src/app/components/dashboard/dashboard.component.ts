import { Component, NgZoneOptions, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { AuthService } from '../../Service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserStoreService } from '../../Service/user-store.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements  OnInit {
 
  public fullName: string="";
  public role: string="";
 
  public users: any = [];
  constructor(private userStore:UserStoreService,private router: Router, private auth: AuthService, private api: ApiService) {
    
  }
  ngOnInit(): void {
    this.api.getAllUsers().subscribe(res=>
    {
      this.users=res;
    }
    )

    this.userStore.getRoleFromStore().subscribe(val=>
    {
      let roleFromToken=this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    }

    )
    this.userStore.getFullNameFromStore().subscribe(val=>
    {
      let fullNameFromToken=this.auth.getFullNameFromToken();
      this.fullName = fullNameFromToken
      console.log(this.fullName)
    }
    )
    console.log("name is :"+this.fullName+"\nRole is:"+this.role)
  }
  logout(){
    this.auth.signOut();
  }
}
