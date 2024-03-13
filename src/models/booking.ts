export type Booking = {
    _id: string;
    Space: {
      _id: string;
      name: string;
      slug: { current: string };
      price: number;
    };
    checkinDate: string;

    numberOfDays: number;
    person: number;
    totalPrice: number;
    discount: number;
  };