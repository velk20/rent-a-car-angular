import { Component } from '@angular/core';
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../models/offer";
import {NgForOf, NgIf} from "@angular/common";
import {of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  userId: number = 0;
  offers: Offer[] = [];
  cars: Car[] = [];

  constructor(private offerService: OfferService,
              private authService: AuthService,
              private carService: CarService,
              private toastr: ToastrService,) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.userId = user.id;
    })

    this.offerService.getAllOffersByUserId(this.userId).subscribe(offers => {
      this.offers = offers.data as Offer[];
    });

    this.carService.getAllCarsByUser(this.userId).subscribe(cars => {
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
