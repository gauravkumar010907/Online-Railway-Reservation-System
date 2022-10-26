import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {
  booking_id: any;
  TrainId:any;
  CurrentFare : any;
  CurrentPassengerId : any;
  TotalFare:any ;
  PassengerId: any;

  passengerForm= new FormGroup({
    name: new FormControl('',Validators.required),
    age: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    quota: new FormControl('',Validators.required),
    requiredseats: new FormControl('',[Validators.required,Validators.max(6)]),
    // booking_id:new FormControl('',Validators.required),
    // trainId:new FormControl('',Validators.required)
  })



  get Name(): FormControl{
    return this.passengerForm.get('name') as FormControl; 
  }
  get Age(): FormControl{
    return this.passengerForm.get('age') as FormControl; 
  }
  get Gender(): FormControl{
    return this.passengerForm.get('gender') as FormControl; 
  }
  get Email(): FormControl{
    return this.passengerForm.get('email') as FormControl; 
  }
  get Quota(): FormControl{
    return this.passengerForm.get('quota') as FormControl; 
  }
  get ReqSeats(): FormControl{
    return this.passengerForm.get('requiredseats') as FormControl; 
  }
//   get BookingId(): FormControl{
//     return this.passengerForm.get('booking_id') as FormControl; 
//   }
//   get Trainid(): FormControl{
//     return this.passengerForm.get('trainId') as FormControl;
// }

  constructor(private service : SharedService, private router : Router) {
    this.service.isLoggedIn();
    this.booking_id=localStorage.getItem("booking_id");
    // console.log(this.currentBookingId);
    this.TrainId=localStorage.getItem("TrainId");
   }

  ngOnInit(): void {
    
  }
  insertPassenger(passengerDetails: any){
    passengerDetails.TrainId=this.TrainId
    passengerDetails.booking_id=this.booking_id
    console.log(passengerDetails)
    this.service.addPassenger(passengerDetails).subscribe(
      (bookingDetails : any)=>
      {
       localStorage.setItem("CurrentPassengerId", bookingDetails.PassengerId)
       localStorage.setItem("CurrentFare", bookingDetails.TotalFare)
      // console.log(bookingDetails)
       this.router.navigate(['/payment'])
      } 
     )
  }
  logout(){
    this.service.logout();
    this.router.navigate(['/login'])
  }
}
