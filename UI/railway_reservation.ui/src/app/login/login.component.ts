// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { SharedService } from '../shared.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm= new FormGroup({
//     userLoginId:new FormControl('',Validators.required),
//     Password:new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(15)])
//   })
//     get userId():FormControl{
//       return this.loginForm.get('userLoginId') as FormControl;
//     }
//     get password():FormControl{
//       return this.loginForm.get('Password') as FormControl;
//     }
//   constructor(private service : SharedService, private router : Router) { }

//   ngOnInit(): void {
//   }

//   login( ulogin : any){
//     // console.log(ulogin)
//     this.service.userLogin(ulogin).subscribe( 
//       (result:any)  => 
//       {
//                   if(result.success){
//             console.log(result);
//             alert(result.message);
//           }
//           else{
//             console.log(result);
//             alert("Login Successfull");
//           }
//       this.router.navigate(['/user/user-page'])
//       }

//       )}
// }
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    loginId: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    designation: new FormControl('', Validators.required)
  })



  get Id(): FormControl {
    return this.loginForm.get('loginId') as FormControl;
  }
  get Pwd(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  get las(): FormControl{
    return this.loginForm.get('designation') as FormControl;

  }


  constructor(private service: SharedService, private router: Router) {

  }
  @Input() login1:any;
  loginId:any;
  password:any;
  designation:any;

  ngOnInit(): void {
    this.loginId=this.login1.loginId;
    this.password=this.login1.password;
    this.designation=this.login1.designation;
  }

  // login(loginData: any) {
  //   if (loginData.loginAs === "user") {
  //     this.service.userLogin(loginData).subscribe(
  //       (result: any) => {
  //         this.router.navigate(['/user/user-page'])
  //         console.log(result);
  //         alert("Login Successfull");
  //         this.service.setActiveUser(result);

  //       },err =>{
  //         if(err.status==404 || err.status==400)
  //         alert("Authentication Failed!! Invalid Credentails");
  //         else
  //         console.log(err);
  //       }


  //     )
  //   }
  //   if (loginData.loginAs === "admin") {
  //     this.service.adminLogin(loginData).subscribe(
  //       (result:any) => {
  //         this.router.navigate(['/admin/managetrain'])
  //         console.log(result);
  //         alert("Login Successfull");
  //         this.service.setActiveUser(result);
  //       },err =>{
  //         if(err.status==404 || err.status==400)
  //         alert("Authentication Failed!! Invalid Credentails");
  //         else
  //         console.log(err);
  //       }
  //     )
  //     }
  //   }
  
  login() {
    var val={
      loginId:this.loginId,
      password:this.password,
      designation:this.designation
    }

    if (this.designation === "user") {
      this.service.userLogin(val).subscribe(
        (result: any) => {
          this.router.navigate(['/bookings/add-booking'])
          console.log(result);
          alert("Login Successfull");
          this.service.setActiveUser(result);
          localStorage.setItem("role",val.designation);

        },err =>{
          if(err.status==404 || err.status==400)
          alert("Login Failed!! Invalid Credentails");
          else
          console.log(err);
        }


      )
    }
    if (this.designation === "admin") {
      this.service.adminLogin(val).subscribe(
        (result:any) => {
          this.router.navigate(['/admin/managetrain'])
          console.log(result);
          alert("Login Successfull");
          this.service.setActiveUser(result);
          localStorage.setItem("role",val.designation);
        },err =>{
          if(err.status==404 || err.status==400)
          alert("Login Failed!! Invalid Credentails");
          else
          console.log(err);
        }
      )
      }
    }
}
