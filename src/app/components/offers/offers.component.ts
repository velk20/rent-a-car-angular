import { Component } from '@angular/core';
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../models/offer";
import {NgForOf} from "@angular/common";
import {of} from "rxjs";
import {ToastrService} from "ngx-toastr";

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

  constructor(private offerService: OfferService,
              private toastr: ToastrService,) {
  }

  ngOnInit() {
    this.offerService.getAllOffersByUserId(1).subscribe(offers => {
      this.offers = offers.data as Offer[];
    })
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
}
