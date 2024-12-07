import { Component } from '@angular/core';
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  cars: Car[] = [];
  user: User|null = null;

  constructor(private carService: CarService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
    if (this.user){
      this.carService.getAllCarsByUser(this.user.id).subscribe(
        (res)=>{
          this.cars = res.data as Car[];
        }
      )
    }else {
      this.carService.getAllCars().subscribe(
        (res)=>{
          console.log(res.data)
          this.cars = res.data as Car[];
        }
      )
    }

  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  goToOfferForm(car: Car) {
    this.router.navigate(['/form'], {queryParams: {carData: JSON.stringify(car)}});
  }

  protected readonly HTMLImageElement = HTMLImageElement;

  onImageError(event: Event): void {
    console.log(event);
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://via.placeholder.com/200x200.png?text=Car+Image';
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
