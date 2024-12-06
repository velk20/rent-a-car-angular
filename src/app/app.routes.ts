import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {AboutComponent} from "./components/about/about.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {OfferFormComponent} from "./components/offer-form/offer-form.component";
import {OffersComponent} from "./components/offers/offers.component";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'offers', component: OffersComponent},
  {path: 'form', component:OfferFormComponent}
];
