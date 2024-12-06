export interface RegisterUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  years: number;
  previousAccidents: boolean;
  role: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface User extends RegisterUser {
  id: number;
}
