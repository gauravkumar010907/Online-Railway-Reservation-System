import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl= "https://localhost:7084/api";
bookingId : any;
//PassengerId : any;
  constructor(private http:HttpClient, private router:Router) { }

  isLoggedIn(){
    let token=localStorage.getItem("jwtToken")
    if (token==null){
      this.router.navigate(['/login'])   
      alert("Please Login First")

    }
  }

  setActiveUser(token:any){
    localStorage.setItem("jwtToken",token)
  }
  
  logout(){
    localStorage.removeItem("jwtToken")
  }

  addBooking(val:any){
    let a=this.APIUrl+'/Booking/'+val.date+'/'+val.source+'/'+val.destination
    // console.log(a)
    return this.http.post(a,null)
  }
// https://localhost:7084/api/Train/tata/bbsr

  getTrain(val:any){
    let a=this.APIUrl+'/Train/'+val.date+'/'+val.source+'/'+val.destination
    // console.log(a)
    return this.http.get(a)
  }
  // https://localhost:7084/api/Passenger/gk/2/male/general/2/1/1

  addPassenger(val:any){
    let a=this.APIUrl+'/Passenger/'+val.name+'/'+val.age+'/'+val.gender+'/'+val.email+'/'+val.quota+'/'+val.requiredseats+'/'+val.booking_id+'/'+val.TrainId
    //console.log(a)
    return this.http.post(a,null)
  }
  // https://localhost:7084/api/Payment/1/gk/1234/123/2022-10-10
  payment(val:any){
    let a=this.APIUrl+'/Payment/'+val.PassengerId+'/'+val.cardHolderName+'/'+val.cardNumber+'/'+val.cvv+'/'+val.expiry
    return this.http.post(a,null)
  }
  // https://localhost:7084/api/Passenger/43
  deleteBooking(val:any){
    let a=this.APIUrl+'/Passenger/'+val.id
    return this.http.delete(a)
  }
  addUser(val:any){
    let a=this.APIUrl+'/User/'+val.userloginId+'/'+val.username+'/'+val.password+'/'+val.contactNo+'/'+val.email+'/'+val.address
    return this.http.post(a,null)
  }
  // https://localhost:7084/api/Train/1/2022-08-10/3000
  updateTrain(val:any){
    let a=this.APIUrl+'/Train/'+val.id+'/'+val.datetime+'/'+val.fare
    return this.http.patch(a,null)
  }
 
    // static gettrainData() {
    //   throw new Error('Method not implemented.');
    // }
  // readonly APIUrl="https://localhost:7084/"     
  gettrainData() {
    let APIUrl="https://localhost:7084/api/Train";
    return this.http.get(APIUrl);
  }
 getBooking(val:any){
    let a=this.APIUrl+'/Passenger/'+val.id
    return this.http.get(a)
  }
  // userLogin(val:any){
  //   let a=this.APIUrl+'/User/'+val.userLoginId+'/'+val.Password
  //   return this.http.post(a,null)
  // }
  // adminLogin(val:any){
  //   let a=this.APIUrl+'/Admin/'+val.adminloginId+'/'+val.password
  //   return this.http.get(a)
  // }
  adminLogin(val:any){
    let a=this.APIUrl+'/Admin/'+val.loginId+'/'+val.password
    return this.http.post(a,null)
  }
  userLogin(val:any){
    let a=this.APIUrl+'/User/'+val.loginId+'/'+val.password
    return this.http.post(a,null)
  }
}