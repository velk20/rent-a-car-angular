import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterUser} from "../models/user";
import {Observable} from "rxjs";
import {AppResponseWithNoData} from "../utils/app.response";
import {Constant} from "../utils/constant";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  register(user: RegisterUser): Observable<AppResponseWithNoData>{
    return this.http.post<AppResponseWithNoData>(Constant.USERS_URL, user);
  }
}
