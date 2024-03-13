import { FC } from 'react';
import Image from 'next/image';

import { Space } from '@/models/space';
import Link from 'next/link';

type Props = {
  space: Space;
};

const SpaceCard: FC<Props> = props => {
  const {
    space: { coverImage, name, price, type, description, slug, isBooked },
  } = props;

  return (
    <div className='rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black'>
      <div className='h-60 overflow-hidden'>
        <Image
          src={coverImage.url}
          alt={name}
          width={250}
          height={250}
          className='img scale-animation'
        />
      </div>

      <div className='p-4 bg-white'>
        <div className='flex justify-between text-xl font-semibold'>
          <p>{name}</p>
          <p>₹{price}</p>
        </div>

        <p className='pt-2 text-xs'>{type} Space</p>

        <p className='pt- pb-6'>{description.slice(0, 100)}...</p>

        <Link
          href={`/spaces/${slug.current}`}
          className='bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500'
        >
          {isBooked ? 'BOOKED' : 'BOOK NOW'}
        </Link>
      </div>
    </div>
  );
};

export default SpaceCard;