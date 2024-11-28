export interface Car extends CreateCar{
  id: number;

}

export interface CreateCar{
  brand: string;
  model: string;
  city: string;
  year: number;
  pricePerDay: number;
}
