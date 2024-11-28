export interface CreateOffer {
  carId: number;
  userId: number;
  startDate: Date;
  endDate: Date;
}

export interface Offer extends CreateOffer {
  id: number;
}

