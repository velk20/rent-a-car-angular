import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {YearsValidator} from "../../validators/years.validator";
import {RegisterUser, User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

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
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
  ) {
  }

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    repassword: ['', [Validators.required]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    years: [0, [Validators.required, YearsValidator.minimumAge(17)]],
    previousAccidents: [null, Validators.required],
    role: ['User', Validators.required],
  });


  onSubmit() {
    let password = this.registerForm.value.password;
    let repassword = this.registerForm.value.repassword;

    if (password !== repassword) {
      this.toastrService.error(`Passwords do not match.`);
      return;
      this.registerForm.value.repassword = '';
      this.registerForm.value.password = '';
    }

    let user: RegisterUser = {
      username: this.registerForm.value.username || '',
      password: this.registerForm.value.password || '',
      firstName: this.registerForm.value.firstName || '',
      lastName: this.registerForm.value.lastName || '',
      city: this.registerForm.value.city || '',
      phone: this.registerForm.value.phone || '',
      years: this.registerForm.value.years || 0,
      previousAccidents: this.registerForm.value.previousAccidents || false,
      role: this.registerForm.value.role || 'User',
    };

    this.userService.createUser(user).subscribe(
      (res) => {
        this.authService.login(res.data as User);
        this.router.navigate(['/']);
        this.toastrService.success('Register successfully!');
      },
      (err) => {
        console.log(err)
        let code: number = err.error.code;
        let status: string = err.error.status;
        let errors: string[] = err.error.errors;

        this.toastrService.error(`${status} - ${code}`);
        errors.forEach(error => {
          this.toastrService.error(error);
        });
      }
    );

  }
}
