import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from './bookings/add-booking/add-booking.component';
import { DeleteBookingComponent } from './bookings/delete-booking/delete-booking.component';
import {BookingsComponent} from './bookings/bookings.component';
import {PassengerComponent} from './passenger/passenger.component';
import {AddPassengerComponent} from './passenger/add-passenger/add-passenger.component';
import { PaymentComponent } from './payment/payment.component'; 
import { AdminComponent } from './admin/admin.component';
import { ManagetrainComponent } from './admin/managetrain/managetrain.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { TrainDetailsComponent } from './train-details/train-details.component';
import { GetBookingComponent } from './bookings/get-booking/get-booking.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SouravComponent } from './sourav/sourav.component';
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path: 'bookings',component:BookingsComponent},
  {path: 'bookings/add-booking',component:AddBookingComponent},
  {path: 'bookings/delete-booking',component:DeleteBookingComponent},
  {path: 'passenger',component:PassengerComponent},
  {path: 'passenger/add-passenger',component:AddPassengerComponent},
  {path:'payment',component:PaymentComponent},
  {path:'admin',component:AdminComponent},
  {path:'admin/managetrain',component:ManagetrainComponent},
  {path: 'user',component:UserComponent},
  {path:'user/add-user',component:AddUserComponent},
  {path:'user/user-page',component:UserPageComponent},
  {path : 'train-details', component:TrainDetailsComponent},
  {path : 'bookings/get-booking', component:GetBookingComponent},
  {path: 'login', component:LoginComponent},
  {path:'test',component:TestComponent},
  {path:'sourav',component:SouravComponent},
  { path: '**', pathMatch: 'full',component: PagenotfoundComponent },
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
