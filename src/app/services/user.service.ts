import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginUser, RegisterUser, User} from "../models/user";
import {Observable} from "rxjs";
import {AppResponse, AppResponseWithMessage, AppResponseWithNoData} from "../utils/app.response";
import {Constant} from "../utils/constant";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUserById(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${Constant.CARS_URL}/${id}`)
  }

  getAllUsers(): Observable<AppResponse> {
    return this.http.get<AppResponse>(Constant.CARS_URL);
  }

  loginUser(user: LoginUser): Observable<AppResponseWithMessage>{
    return this.http.post<AppResponseWithMessage>(Constant.USERS_URL+"/login", user);
  }

  createUser(user: RegisterUser): Observable<AppResponseWithMessage>{
    return this.http.post<AppResponseWithMessage>(Constant.USERS_URL, user);
  }

  updateUser(id: number, user: User): Observable<AppResponseWithMessage> {
    return this.http.put<AppResponseWithMessage>(`${Constant.USERS_URL}/${id}`, user);
  }

  deleteUser(id: number): Observable<AppResponseWithNoData> {
    return this.http.delete<AppResponseWithNoData>(`${Constant.USERS_URL}/${id}`);
  }
}
