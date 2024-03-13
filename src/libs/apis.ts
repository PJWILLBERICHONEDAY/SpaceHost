import { CreateReviewDto, Review } from '../models/review';
import axios from 'axios';

import { CreateBookingDto, Space } from '@/models/space';
import sanityClient from './sanity';
import * as queries from './sanityQueries';
import { Booking } from '@/models/booking';
import { UpdateReviewDto } from '@/models/review';
import space from '../../schemaTypes/spaces';

export async function getFeaturedSpace() {
  const result = await sanityClient.fetch<Space>(
    queries.getFeaturedSpaceQuery,
    {},
    { cache: 'no-cache' }
  );

  return result;
}

export async function getSpaces() {
  const result = await sanityClient.fetch<Space[]>(
    queries.getSpacesQuery,
    {},
    { cache: 'no-cache' }
  );
  return result;
}

export async function getSpace(slug: string) {
  const result = await sanityClient.fetch<Space>(
    queries.getSpace,
    { slug },
    { cache: 'no-cache' }
  );

  return result;
}

export const createBooking = async ({
  person,
  checkinDate,
  checkoutDate,
  discount,
  Space,
  numberOfDays,
  totalPrice,
  user,
}: CreateBookingDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'booking',
          user: { _type: 'reference', _ref: user },
          Space: { _type: 'reference', _ref: space },
          checkinDate,
          checkoutDate,
          numberOfDays,
          person,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const updateSpace = async (SpaceId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: SpaceId,
          set: {
            isBooked: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getUserBookings(userId: string) {
  const result = await sanityClient.fetch<Booking[]>(
    queries.getUserBookingsQuery,
    {
      userId,
    },
    { cache: 'no-cache' }
  );

  return result;
}

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: 'no-cache' }
  );

  return result;
}

export async function checkReviewExists(
  userId: string,
  SpaceId: string
): Promise<null | { _id: string }> {
  const query = `*[_type == 'review' && user._ref == $userId && Space._ref == $SpaceId][0] {
    _id
  }`;

  const params = {
    userId,
    SpaceId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ? result : null;
}

export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
}: UpdateReviewDto) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const createReview = async ({
  SpaceId,
  reviewText,
  userId,
  userRating,
}: CreateReviewDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'review',
          user: {
            _type: 'reference',
            _ref: userId,
          },
          Space: {
            _type: 'reference',
            _ref: SpaceId,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getSpaceReviews(spaceId: string) {
  const result = await sanityClient.fetch<Review[]>(
    queries.getSpaceReviewsQuery,
    {
      spaceId,
    },
    { cache: 'no-cache' }
  );

  return result;
}