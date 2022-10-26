import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-sourav',
  templateUrl: './sourav.component.html',
  styleUrls: ['./sourav.component.css']
})
export class SouravComponent implements OnInit {

  constructor(private service: SharedService, private router: Router) {

  }

 ngOnInit(): void {
 }

 login(loginData: any) {
   this.service.userLogin(loginData).subscribe(
     (result: any) => {
       this.router.navigate(['/user/user-page'])
       console.log(result);
       alert("Login Successfull");
       this.service.setActiveUser(result);

     })
 }

}
