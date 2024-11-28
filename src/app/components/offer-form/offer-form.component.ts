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
import {Offer} from "../../models/offer";
import {ToastrService} from "ngx-toastr";

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
    const newOffer: Offer = {
      carId: this.carId,
      userId: this.userId,
      startDate: this.dateForm.value.startDate,
      endDate: this.dateForm.value.endDate,
    }

    console.log(newOffer);
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
