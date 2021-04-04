import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../user'
import { UserRegistrationService } from '../user-registration.service';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading=false;
  angForm!: FormGroup;
 user: User= new User("","");
 button = 'Login';
  message:any;
    errorMessage: any;
  constructor( private service:UserRegistrationService, private router:Router,private fb: FormBuilder) {  }

  ngOnInit(): void {
    this.createForm();
  }
   createForm() {
    this.angForm = this.fb.group({
       username: ['', Validators.required ],
        password: ['', Validators.required ]
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
  this.errorMessage = "";
    this.isLoading = true;
    this.button = 'Processing';

    setTimeout(() => {
      this.isLoading = false;
      this.button = 'Submit';
    
    }, 2000)
 if(this.angForm.valid){
let resp=this.service.login(this.user);
console.log(resp);
resp.subscribe((data)=>{
  console.log(data);
  this.router.navigate(['/data']);
},
(error) => {
    console.error(error)
          this.errorMessage = "Invalid Email or Password";
 
          throw error;
   }
);
  }
   else {
    this.validateAllFormFields(this.angForm); //{7}
  }
  }
}
