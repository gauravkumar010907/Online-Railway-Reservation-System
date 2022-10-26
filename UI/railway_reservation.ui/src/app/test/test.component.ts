import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private service: SharedService, private router: Router) {

   }

  ngOnInit(): void {
  }

  login(loginData: any) {
    this.service.adminLogin(loginData).subscribe(
      (result: any) => {
        this.router.navigate(['admin/managetrain'])
        console.log(result);
        alert("Login Successfull");
        this.service.setActiveUser(result);

      })
  }
}
