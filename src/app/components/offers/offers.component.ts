import { Component } from '@angular/core';
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../models/createOffer";
import {NgForOf} from "@angular/common";
import {of} from "rxjs";

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

  constructor(private offerService: OfferService) {
  }

  ngOnInit() {
    this.offerService.getAllOffersByUserId(1).subscribe(offers => {
      this.offers = offers.data as Offer[];
    })
  }

  protected readonly of = of;

  acceptOffer(id: number) {
    this.offerService.acceptOffer(id).subscribe(offer => {

    })
  }
}
