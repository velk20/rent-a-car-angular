import {Component, inject} from '@angular/core';
import {Form, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
  ) {
  }

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    years: [0, Validators.required],
    previousAccidents: ['', Validators.required],
  });


  onSubmit() {}
}
