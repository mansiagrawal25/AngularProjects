export class Data{
 id?:string
 timeStamp?:string
 flow: number
 pressure: number
 constructor(flow:number,pressure:number){
this.flow=flow;
this.pressure=pressure;
 }
}