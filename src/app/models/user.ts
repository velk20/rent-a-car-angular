export interface RegisterUser {
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  years: number;
  previousAccidents: boolean;
}

export interface User extends RegisterUser {
  id: number;
}
