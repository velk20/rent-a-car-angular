import { Component } from '@angular/core';
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  cars: Car[] = [];

  constructor(private carService: CarService,
              private router: Router) {
  }

  ngOnInit() {
      this.carService.getAllCarsByUser().subscribe(
        (res)=>{
          this.cars = res.data as Car[];
        }
      )
  }

  goToOfferForm(car: Car) {
    this.router.navigate(['/form'], {queryParams: {carData: JSON.stringify(car)}});
  }

  protected readonly HTMLImageElement = HTMLImageElement;

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://via.placeholder.com/200x200.png?text=Car+Image';
  }
}
