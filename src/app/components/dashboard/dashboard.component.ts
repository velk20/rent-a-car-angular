import { Component } from '@angular/core';
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";
import {NgForOf} from "@angular/common";

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

  constructor(private carService: CarService) {
  }

  ngOnInit() {
      this.carService.getAllCarsByUser().subscribe(
        (res)=>{
          this.cars = res.data as Car[];
        }
      )
  }
}
