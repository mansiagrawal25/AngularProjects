import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {DataVisualizationComponent} from './data-visualization/data-visualization.component';
import {LoginComponent} from './login/login.component';
import {DataShowComponent} from './data-show/data-show.component'

const routes: Routes = [
  {path:"",redirectTo:"register",pathMatch:"full"},
  {path: "register", component:RegistrationComponent},
  {path:"login", component:LoginComponent},
  {path:"data", component:DataVisualizationComponent},
  {path:"showdata", component:DataShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
