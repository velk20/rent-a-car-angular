import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {AboutComponent} from "./components/about/about.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ListElementsComponent} from "./components/list-elements/list-elements.component";

export const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'list', component: ListElementsComponent}
];
