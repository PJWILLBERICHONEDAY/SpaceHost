type CoverImage = {
    url: string;
  };
  
  export type Image = {
    _key: string;
    url: string;
  };
  
  type Amenity = {
    _key: string;
    amenity: string;
    icon: string;
  };
  
  type Slug = {
    _type: string;
    current: string;
  };
  
  export type Space = {
    _id: string;
    coverImage: CoverImage;
    description: string;
    discount: number;
    images: Image[];
    isBooked: boolean;
    isFeatured: boolean;
    name: string;
    offeredAmenities: Amenity[];
    price: number;
    slug: Slug;
    specialNote: string;
    type: string;
  };
  
  export type CreateBookingDto = {
    user: string;
    Space: string;
    checkinDate: string;
    checkoutDate: string;
    numberOfDays: number;
    person: number;
    totalPrice: number;
    discount: number;
  };