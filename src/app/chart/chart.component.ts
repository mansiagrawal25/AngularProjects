import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../data';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() dataObj :Data[] = [];
  @Input() showChart : boolean = true;;
  @Output() closeChartEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {   this.getValuesFromInput();   }
  barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  barChartLabels :string[]= [];
  barChartLegend = true;
  barChartData = [
    {data: [100], label: 'flow'},
    {data: [100], label: 'pressure'}
  ];

  getValuesFromInput(){
    this.barChartData[0].data =[];
    this.barChartData[1].data =[];
      for( let d of this.dataObj){
        (d.timeStamp)?this.barChartLabels.push(d.timeStamp): console.log(" ");
        this.barChartData[0].data.push(d.flow);
        this.barChartData[1].data.push(d.pressure);
      }
  
  }

  closeChart(){
    this.closeChartEvent.emit(!this.showChart);
  }
 
}
