import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoginUser, User} from "../../models/user";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
  ) {
  }



loginForm = this.fb.group({
  username: ['', [Validators.required]],
  password: ['', [Validators.required]],
});

  onSubmit() {

    let loginUser: LoginUser = {
      username: this.loginForm.value.username || '',
      password: this.loginForm.value.password || '',
    }

    this.userService.loginUser(loginUser).subscribe(
      res => {
        this.authService.login(res.data as User);
        this.router.navigate(['/']);
        this.toastrService.success('Login successfully!');
      },
      (err) => {
        console.log(err)
        let message: number = err.error.message;

        this.toastrService.error(`${message}`);
      }
    )
  }

}
