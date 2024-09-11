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
  public users: any = [];
  constructor(private userStore:UserStoreService,private router: Router, private auth: AuthService, private api: ApiService) {
    
  }
  ngOnInit(): void {
    this.api.getAllUsers().subscribe(res=>
    {
      this.users=res;
    }
    )

    this.userStore.getFullNameFromStore().subscribe(val=>
    {
      let fullNameFromToken=this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken



      console.log("Hello"+this.fullName);
      
      console.log("value"+val);

      console.log("fulname"+fullNameFromToken);

    }
    )
    

  }
  logout(){
    this.auth.signOut();
  }

}
