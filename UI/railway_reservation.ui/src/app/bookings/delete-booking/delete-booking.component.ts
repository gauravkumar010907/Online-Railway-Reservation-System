import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-delete-booking',
  templateUrl: './delete-booking.component.html',
  styleUrls: ['./delete-booking.component.css']
})
export class DeleteBookingComponent implements OnInit {
  id:any

  deleteForm= new FormGroup({
    id: new FormControl('',Validators.required),
    

  })



  get Id(): FormControl{
    return this.deleteForm.get('id') as FormControl;
}

  constructor( private service : SharedService, private router : Router) { 
    this.service.isLoggedIn();
  }

  ngOnInit(): void {
  }
  removeBooking(bookingDetails : any){
    console.log(bookingDetails)
    this.service.deleteBooking(bookingDetails).subscribe( 
      ()=> 
        this.router.navigate(['/bookings/add-booking'])
      
    )
  }
  trainDetails(){
    localStorage.removeItem("jwtToken");
    this.router.navigate(['/train-details'])
  }
  logout(){
    this.service.logout();
    this.router.navigate(['/login'])
  }
}
