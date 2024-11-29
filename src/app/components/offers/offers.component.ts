import { Component } from '@angular/core';
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../models/offer";
import {NgForOf} from "@angular/common";
import {of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  offers: Offer[] = [];
  cars: Car[] = [];

  constructor(private offerService: OfferService,
              private carService: CarService,
              private toastr: ToastrService,) {
  }

  ngOnInit() {
    this.offerService.getAllOffersByUserId(1).subscribe(offers => {
      this.offers = offers.data as Offer[];
    });

    this.carService.getAllCarsByUser(1).subscribe(cars => {
      this.cars = cars.data as Car[];
    });

  }

  protected readonly of = of;

  acceptOffer(id: number) {
    this.offerService.acceptOffer(id).subscribe(res => {
      const offer = this.offers.find(offer => offer.id === id);
      if (offer) {
        offer.accepted = true;
      }
      this.toastr.success('Offer accepted');
    }, err => {
      this.toastr.error('Error while accepting offer');
      console.log(err)
    })
  }

  getCarBrand(carId: number) {
      return this.cars.find(car => car.id === carId)?.brand;
  }

  getCarModel(carId: number) {
    return this.cars.find(car => car.id === carId)?.model;
  }
}
