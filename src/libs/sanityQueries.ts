import { groq } from 'next-sanity';

export const getFeaturedSpaceQuery = groq`*[_type == "hotelRoom" && isFeatured == true][0] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage
    
}`;

export const getSpacesQuery = groq`*[_type == "hotelRoom"] {
    _id, 
    coverImage,
    description,
    isBooked,
    isFeatured,
    name,
    price,
    slug,
    type
}`;

export const getSpace = groq`*[_type == "hotelRoom" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    discount,
    images,
    isBooked,
    isFeatured,
    name,
    offeredAmenities,
    price,
    slug,
    specialNote,
    type
}`;

export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
    _id,
   Space -> {
        _id,
        name,
        slug,
        price
    },
    checkinDate,
    checkoutDate,
    numberOfDays,
    adults,
    children,
    totalPrice,
    discount
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
}`;

export const getSpaceReviewsQuery = groq`*[_type == "review" && Space._ref == $spaceId] {
    _createdAt,
    _id,
    text,
    user -> {
    name
    },
    userRating
}`;