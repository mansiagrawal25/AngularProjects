import { Component, OnInit } from '@angular/core';
import {Data} from '../data'
import { DataVisualizationService } from '../data-visualization.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-data-show',
  templateUrl: './data-show.component.html',
  styleUrls: ['./data-show.component.scss'],
   animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataShowComponent implements OnInit {
  errorMessage: any;
  loading =false;
  chartIsVisible :boolean = false;
  page = 1;
  pageSize =5;
     show:boolean = false;
  Values: Data[] = [];
  sortorder:Boolean = false;
  dataId : String = ""
  foundData : any = {}
  constructor(private service:DataVisualizationService) { }

  ngOnInit(): void {
    this.submit();
  }


public submit(){

this.service.getList().subscribe((data:Data[])=>   this.Values = data );
  }

  sort(){
    this.sortorder = !this.sortorder;
    console.log("sorting")
    // we have to sort this.Values based on true or false

    if(this.sortorder){
      this.Values.sort((a,b) => {
                return (  (b.timeStamp)?  new Date(b.timeStamp?.replace(" ", "T").concat("Z")).getTime() : new Date().getTime()) -
         ((a.timeStamp)?  new Date(a.timeStamp?.replace(" ", "T").concat("Z")).getTime() : new Date().getTime());
    
      })
    }
    else{
      this.Values.sort((a,b) => { 
                return (  (a.timeStamp)?  new Date(a.timeStamp?.replace(" ", "T").concat("Z")).getTime() : new Date().getTime()) -
         ((b.timeStamp)?  new Date(b.timeStamp?.replace(" ", "T").concat("Z")).getTime() : new Date().getTime());
    
      });

    }

  }
  
  findByID(){
    // this.isLoading=true;
    this.errorMessage = "";
  this.loading=true;  
     this.show = !this.show;

    if(this.dataId !== '')
    this.service.findByID(this.dataId).subscribe( (data: Data)=> {
       this.foundData = data
      },(error) => {
    console.error(error)
          this.errorMessage = "Invalid ID";
          this.loading = false;
 
          throw error;
   })
    else
    this.foundData={}
  }
  viewChart(){
    this.chartIsVisible = true;
  }
  closeChart(){
    this.chartIsVisible = false;
  }
}
