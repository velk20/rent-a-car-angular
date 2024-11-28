import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {YearsValidator} from "../../validators/years.validator";
import {RegisterUser} from "../../models/user";
import {UserService} from "../../services/user.service";

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
    private userService: UserService,
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
    years: [0, [Validators.required, YearsValidator.minimumAge(17)]],
    previousAccidents: [null, Validators.required],
  });


  onSubmit() {
    let user: RegisterUser = {
      firstName: this.registerForm.value.firstName || '',
      lastName: this.registerForm.value.lastName || '',
      city: this.registerForm.value.city || '',
      phone: this.registerForm.value.phone || '',
      years: this.registerForm.value.years || 0,
      previousAccidents: this.registerForm.value.previousAccidents || false,
    };

    this.userService.register(user).subscribe(
      (res)=>{
        this.router.navigate(['/']);
        this.toastrService.success('Register successfully!');
      },
      (err)=>{
        this.toastrService.error(err.message);
      }
    )

  }
}
