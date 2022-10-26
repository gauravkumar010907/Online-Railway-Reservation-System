import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.css']
})
export class TrainDetailsComponent implements OnInit {
  TrainList:any;
    constructor(private sharedService:SharedService) {
      this.TrainList=[];
      this.sharedService.gettrainData().subscribe(traindata=>{
        console.log(traindata);
         this.TrainList=traindata;
      })
    }
   ngOnInit():void{}
}
