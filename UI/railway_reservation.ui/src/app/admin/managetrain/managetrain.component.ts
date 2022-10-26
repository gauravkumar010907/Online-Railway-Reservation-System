import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-managetrain',
  templateUrl: './managetrain.component.html',
  styleUrls: ['./managetrain.component.css']
})
export class ManagetrainComponent implements OnInit {

  manageForm= new FormGroup({
    id: new FormControl('',Validators.required),
    datetime: new FormControl('',Validators.required),
    fare: new FormControl('',Validators.required),

  })



  get Id(): FormControl{
    return this.manageForm.get('id') as FormControl; 
  }
  get Date(): FormControl{
    return this.manageForm.get('datetime') as FormControl; 
  }
  get Fare(): FormControl{
    return this.manageForm.get('fare') as FormControl;
}
TrainList:any;

  constructor(private svc : SharedService, private router:Router) { 
    this.svc.isLoggedIn();
    this.TrainList=[];
    this.svc.gettrainData().subscribe(traindata=>{
      console.log(traindata);
       this.TrainList=traindata;
    })
  }
  currentDate : any = new Date();

  ngOnInit(): void {

    if(localStorage.getItem("role")=="admin"){

    }
    else{
      alert("You are not authorized, Please Login first");
      this.router.navigate(['/login'])
      localStorage.clear()
    }

  }
  manageTrain(trainDetails : any){
    console.log(trainDetails)
    this.svc.updateTrain(trainDetails).subscribe(   )
    alert("Data Updated Successfully");
  }
  logout(){
    this.svc.logout();
    this.router.navigate(['/login'])
  }
}
