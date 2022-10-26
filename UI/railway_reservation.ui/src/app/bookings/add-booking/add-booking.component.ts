import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  
  bookingForm= new FormGroup({
    date: new FormControl('',Validators.required),
    source: new FormControl('',Validators.required),
    destination: new FormControl('',Validators.required),

  })
  props: any;



  get Date(): FormControl{
    return this.bookingForm.get('date') as FormControl; 
  }
  get Source(): FormControl{
    return this.bookingForm.get('source') as FormControl; 
  }
  get Destination(): FormControl{
    return this.bookingForm.get('destination') as FormControl;
}
TrainList:any;
  constructor(private svc : SharedService, private router : Router) { 
    this.svc.isLoggedIn();
    this.TrainList=[];
    this.svc.gettrainData().subscribe(traindata=>{
      console.log(traindata);
       this.TrainList=traindata;
    })
  }

  currentDate : any = new Date();
  ngOnInit(): void {
    }
    
    bookTicket(ticketDetails: any) { 

      this.svc.addBooking(ticketDetails).subscribe(
        (bookingId : any)=>
        {
          this.svc.getTrain(ticketDetails).subscribe(
            (Train : any)=>
            {
              console.log(Train)
              let TrainId=Train[0].TrainId;
              localStorage.setItem("TrainId", TrainId)
              localStorage.setItem("booking_id", bookingId)
              this.router.navigate(['/passenger/add-passenger'])

            })
        })
    } 

  logout(){
    this.svc.logout();
    this.router.navigate(['/login'])
  }
}
