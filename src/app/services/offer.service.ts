import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppResponse, AppResponseWithMessage, AppResponseWithNoData} from "../utils/app.response";
import {Constant} from "../utils/constant";
import {CreateOffer, Offer} from "../models/offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) {

  }

  getAllOffersByUserId(userId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${Constant.OFFERS_URL}/users/${userId}`);
  }

  getOfferById(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${Constant.OFFERS_URL}/${id}`);
  }

  createOffer(offer: CreateOffer): Observable<AppResponseWithNoData> {
    return this.http.post<AppResponseWithNoData>(`${Constant.OFFERS_URL}`, offer);
  }

  acceptOffer(offerId: number): Observable<AppResponseWithMessage> {
    return this.http.put<AppResponseWithMessage>(`${Constant.OFFERS_URL}/${offerId}`, null);
  }

  deleteOffer(offerId: number): Observable<AppResponseWithNoData> {
    return this.http.delete<AppResponseWithNoData>(`${Constant.OFFERS_URL}/${offerId}`);
  }
}
