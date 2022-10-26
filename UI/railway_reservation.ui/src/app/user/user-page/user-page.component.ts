import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  TrainList:any;

  constructor(private service:SharedService, private router:Router) { 
    this.service.isLoggedIn()
    this.TrainList=[];
    this.service.gettrainData().subscribe(traindata=>{
      console.log(traindata);
       this.TrainList=traindata;
    })
  }

  ngOnInit(): void {
  }
  trainDetails(){
    // localStorage.removeItem("jwtToken");
    // this.router.navigate(['/train-details'])
  }
  logout(){
    this.service.logout();
    this.router.navigate(['/login'])
  }
}
