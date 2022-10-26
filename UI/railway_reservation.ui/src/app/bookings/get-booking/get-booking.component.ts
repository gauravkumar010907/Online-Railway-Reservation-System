import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-get-booking',
  templateUrl: './get-booking.component.html',
  styleUrls: ['./get-booking.component.css']
})
export class GetBookingComponent implements OnInit {
@ViewChild('ticket',{static:false}) el!:ElementRef
  bookingDetailsAvailable : boolean=false
 bookingDetails:any

 getForm= new FormGroup({
  id: new FormControl('',Validators.required),
  

})



get Id(): FormControl{
  return this.getForm.get('id') as FormControl;
}

  constructor(private svc :SharedService, private router:Router ) {
    this.svc.isLoggedIn();
   }
  //  getPdf(){
  //   let pdf = new jsPDF('l','pt','a4');
  //   pdf.text("Ticket",19,19)
  //   pdf.html(this.el.nativeElement,{
  //    callback:(pdf)=>{
  //      pdf.save("ticket.pdf");
  //    }
  //   });
  // }
  ngOnInit(): void {
    
  }
getTicket(val:any){

this.svc.getBooking(val).subscribe((a:any)=>{
  console.log(a)
  this.bookingDetails=a[0]
  this.bookingDetailsAvailable=true

})
}
trainDetails(){
  localStorage.removeItem("jwtToken");
  this.router.navigate(['/train-details'])
}
logout(){
  this.svc.logout();
  this.router.navigate(['/login'])
}
getPdf(){
  let pdf= new jsPDF()
  pdf.html(this.el.nativeElement,{
    callback:(pdf) =>{
      pdf.save("Ticket.pdf")
    }
  })

}

}


