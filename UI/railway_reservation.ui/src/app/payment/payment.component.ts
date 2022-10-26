import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  PassengerId: any
  TotalFare: any 
  CurrentPassengerId : any;
  CurrentFare : any;

  paymentForm= new FormGroup({
    // passengerId: new FormControl('',Validators.required),
    cardHolderName: new FormControl('',[Validators.required,Validators.pattern('^[A-Z a-z]*$')]),
    cardNumber: new FormControl('',[Validators.required,Validators.minLength(16),Validators.maxLength(16),Validators.pattern('^[0-9]*$')]),
    cvv: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern('^[0-9]*$')]),
    expiry: new FormControl('',Validators.required),

  })



  // get PId(): FormControl{
  //   return this.paymentForm.get('passengerId') as FormControl; 
  // }
  get CHName(): FormControl{
    return this.paymentForm.get('cardHolderName') as FormControl; 
  }
  get CNo(): FormControl{
    return this.paymentForm.get('cardNumber') as FormControl; 
  }
  get CVV(): FormControl{
    return this.paymentForm.get('cvv') as FormControl; 
  }
  get Expiry(): FormControl{
    return this.paymentForm.get('expiry') as FormControl;
}

  constructor( private service : SharedService, private router : Router ) {
    this.service.isLoggedIn();
    this.PassengerId=localStorage.getItem("CurrentPassengerId")
    this.TotalFare=localStorage.getItem("CurrentFare")
   }
   currentDate : any = new Date();


  ngOnInit(): void {
  }
  addPayment(paymentDetails : any){
    paymentDetails.PassengerId=this.PassengerId
    console.log(paymentDetails)
    this.service.payment(paymentDetails).subscribe(
      (result:any)  => 
      {
        alert('Payment Successful.Please Check your mail for ticket details or go to My Booking page')
        this.service.logout();
        this.router.navigate(['/login'])
      }
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
