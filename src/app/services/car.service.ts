import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppResponse} from "../utils/app.response";
import {Constant} from "../utils/constant";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient) {
  }

  getAllCarsByUser(): Observable<AppResponse>{
    return this.http.get<AppResponse>(`${Constant.CARS_URL}/user/1`)
  }

}
