import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AddBookingComponent } from './bookings/add-booking/add-booking.component';
import {SharedService} from './shared.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PassengerComponent } from './passenger/passenger.component';
import { AddPassengerComponent } from './passenger/add-passenger/add-passenger.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminComponent } from './admin/admin.component';
import { ManagetrainComponent } from './admin/managetrain/managetrain.component';
import { DeleteBookingComponent } from './bookings/delete-booking/delete-booking.component';
import { UserComponent } from './user/user.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { TrainDetailsComponent } from './train-details/train-details.component';
import { GetBookingComponent } from './bookings/get-booking/get-booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component';

import { TestComponent } from './test/test.component';
import { SouravComponent } from './sourav/sourav.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingsComponent,
    AddBookingComponent,
    PassengerComponent,
    AddPassengerComponent,
    PaymentComponent,
    AdminComponent,
    ManagetrainComponent,
    DeleteBookingComponent,
    UserComponent,
    UserPageComponent,
    AddUserComponent,
    TrainDetailsComponent,
    GetBookingComponent,
    LoginComponent,
    TestComponent,
    SouravComponent,
    PagenotfoundComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
