import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Data} from '../data'
import { DataVisualizationService } from '../data-visualization.service';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.scss']
})
export class DataVisualizationComponent implements OnInit {
   data: Data= new Data(0,0);
  message:any;
    isLoading=false;
  angForm!: FormGroup;
  button = 'Submit';
  errorMessage: any;
  constructor(private service:DataVisualizationService, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
 createForm() {
    this.angForm = this.fb.group({
       flow: ['', Validators.required ],
        pressure: ['', Validators.required ]
        
    });
  }
    validateAllFormFields(formGroup: FormGroup) {         //{1}
  Object.keys(formGroup.controls).forEach(field => {  //{2}
    const control = formGroup.get(field);             //{3}
    if (control instanceof FormControl) {             //{4}
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        //{5}
      this.validateAllFormFields(control);            //{6}
    }
  });
}
public submit(){
  console.log(this.data);
  this.errorMessage = "";
    this.isLoading = true;
    this.button = 'Processing';

    setTimeout(() => {
      this.isLoading = false;
      this.button = 'Submit';
    
    }, 2000)
 if(this.angForm.valid && this.data.flow!==0 && this.data.pressure!==0){
let resp=this.service.saveData(this.data);
console.log(resp);
resp.subscribe((data)=>{
  console.log(data);
  this.router.navigate(['/showdata']);
},
(error) => {
    console.error(error)
          this.errorMessage = "Invalid Flow and Pressure";
 
          throw error;
   }
);
  }
   else {
     this.errorMessage = "Flow and Pressure can't be zero";
    this.validateAllFormFields(this.angForm); //{7}
  }
  }
}
