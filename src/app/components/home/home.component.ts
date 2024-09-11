import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../Emitters/emitters';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  message='';
  /**
   *
   */
  constructor(private http:HttpClient) {  
  }
  ngOnInit(): void {

this.http.get("https://localhost:7270/api/Auth",{withCredentials:true}).subscribe((res:any)=>{
  this.message=`Hi ${res.name}`;

  Emitters.outhEmitter.emit(true);
},
err=>{
  this.message="You are not logged in"
}
)
  }
}