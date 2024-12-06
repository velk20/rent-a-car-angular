import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppResponse, AppResponseWithMessage, AppResponseWithNoData} from "../utils/app.response";
import {Constant} from "../utils/constant";
import {Car, CreateCar} from "../models/car";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient) {
  }

  getAllCars(): Observable<AppResponse>{
    return this.http.get<AppResponse>(`${Constant.CARS_URL}`)
  }

  getAllCarsByUser(userId: number): Observable<AppResponse>{
    return this.http.get<AppResponse>(`${Constant.CARS_URL}/user/${userId}`)
  }

  getCarById(id: number): Observable<AppResponse>{
    return this.http.get<AppResponse>(`${Constant.CARS_URL}/${id}`)
  }

  createCar(car:CreateCar): Observable<AppResponseWithNoData>{
    return this.http.post<AppResponseWithNoData>(`${Constant.CARS_URL}`, car)
  }

  updateCar(id: number, car: Car): Observable<AppResponseWithMessage>{
    return this.http.put<AppResponseWithMessage>(`${Constant.CARS_URL}/${id}`, car)
  }

  deleteCar(id: number): Observable<AppResponseWithNoData> {
    return this.http.delete<AppResponseWithNoData>(`${Constant.CARS_URL}/${id}`)
  }
}
