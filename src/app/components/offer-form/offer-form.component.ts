import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateOffer, Offer} from "../../models/offer";
import {ToastrService} from "ngx-toastr";
import {OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './offer-form.component.html',
  styleUrl: './offer-form.component.css'
})
export class OfferFormComponent {
  dateForm: FormGroup;
  carId: number = 0;
  userId: number = 0;

  constructor(private fb: FormBuilder,
              private router: ActivatedRoute,
              private offerService: OfferService,
              private toastr: ToastrService) {
    this.dateForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    },
      { validators: this.endDateValidator }
    );
  }

  ngOnInit() {
    const state = this.router.snapshot.queryParams;
    const carData = state?.['carData'] ? JSON.parse(state['carData']) : null;

    this.carId = carData['id'];
    this.userId = 1;
  }

  onSubmit() {
    const newOffer: CreateOffer = {
      carId: this.carId,
      userId: this.userId,
      startDate: this.dateForm.value.startDate,
      endDate: this.dateForm.value.endDate,
    }

    this.offerService.createOffer(newOffer).subscribe(
      (response) => {
        this.toastr.success(response.message);
      },
      (error) => {
        this.toastr.error(error.message);
      }
    )
  }

  endDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    // If both dates are defined, check if the endDate is before startDate
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { endDateBeforeStartDate: true }; // Custom error key
    }
    return null;
  }
}
