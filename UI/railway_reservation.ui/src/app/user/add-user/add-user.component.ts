import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  registerForm= new FormGroup({
    userloginId: new FormControl('',Validators.required),
    username: new FormControl('',[Validators.required,Validators.minLength(2)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
    contactNo: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    address: new FormControl('',Validators.required),

  })



  get Id(): FormControl{
    return this.registerForm.get('userloginId') as FormControl; 
  }
  get Name(): FormControl{
    return this.registerForm.get('username') as FormControl; 
  }
  get Pwd(): FormControl{
    return this.registerForm.get('password') as FormControl; 
  }
  get Phno(): FormControl{
    return this.registerForm.get('contactNo') as FormControl; 
  }
  get Email(): FormControl{
    return this.registerForm.get('email') as FormControl; 
  }
  get Address(): FormControl{
    return this.registerForm.get('address') as FormControl;
}

  constructor(private service : SharedService,private router : Router) {

   }

  ngOnInit(): void {
  }
  insertUser(userDetails: any){
    console.log(userDetails)
   this.service.addUser(userDetails).subscribe(
    ()=>
    this.router.navigate(['/login'])
   )
   alert("User Registered Successfully")
  }

}
