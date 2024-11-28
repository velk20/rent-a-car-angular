import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {FooterComponent} from "./components/footer/footer.component";
import {NavComponent} from "./components/nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rent-a-car-angular';
}
