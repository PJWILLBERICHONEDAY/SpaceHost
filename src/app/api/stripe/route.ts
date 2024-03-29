import Stripe from 'stripe';

import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getSpace } from '@/libs/apis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});
type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  SpaceSlug: string;
};

export async function POST(req: Request, res: Response) {
  const {
    checkinDate,
    adults,
    checkoutDate,
    SpaceSlug,
    numberOfDays,
  }: RequestData = await req.json();
  if (
    !checkinDate ||
    !checkoutDate ||
    !adults ||
    !SpaceSlug ||
    !numberOfDays
  ) {
    return new NextResponse('Please all fields are required', { status: 400 });
  }
  const origin = req.headers.get('origin');
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Authentication required', { status: 400 });
  }
  const userId = session.user.id;
  const formattedCheckoutDate = checkoutDate.split('T')[0];
  const formattedCheckinDate = checkinDate.split('T')[0];
  try {
    const space = await getSpace(SpaceSlug);
    const discountPrice = space.price - (space.price / 100) * space.discount;
    const totalPrice = discountPrice * numberOfDays;
    // Create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'INR',
            product_data: {
              name: space.name,
              images: space.images.map(image => image.url),
            },
            unit_amount: parseInt((totalPrice * 100).toString()),
          },
        },
      ],
      payment_method_types: ['card'],
      success_url: `${origin}/users/${userId}`,
      metadata: {
        adults,
        checkinDate: formattedCheckinDate,
        checkoutDate: formattedCheckoutDate,
        Space: space._id,
        numberOfDays,
        user: userId,
        discount: space.discount,
        totalPrice
      }
    });
    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: 'Payment session created',
    });
  } catch (error: any) {
    console.log('Payment falied', error);
    return new NextResponse(error, { status: 500 });
  }
}