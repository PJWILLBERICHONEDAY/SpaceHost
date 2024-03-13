'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { getSpaces } from '@/libs/apis';
import { Space } from '@/models/space';
import Search from '@/components/Search/Search';
import SpaceCard from '@/components/SpaceCard/SpaceCard';

const Spaces = () => {
  const [spaceTypeFilter, setSpaceTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('searchQuery');
    const spaceType = searchParams.get('spaceType');

    if (spaceType) setSpaceTypeFilter(spaceType);
    if (searchQuery) setSearchQuery(searchQuery);
  }, []);

  async function fetchData() {
    return getSpaces();
  }

  const { data, error, isLoading } = useSWR('get/hotelRooms', fetchData);

  if (error) throw new Error('Cannot fetch data');
  if (typeof data === 'undefined' && !isLoading)

    throw new Error('Cannot fetch data');

  const filterSpaces = (spaces: Space[]) => {
    return spaces.filter(space => {
      // Apply room type filter

      if (
        spaceTypeFilter &&
        spaceTypeFilter.toLowerCase() !== 'all' &&
        space.type.toLowerCase() !== spaceTypeFilter.toLowerCase()
      ) {
        return false;
      }

      //   Apply search query filter
      if (
        searchQuery &&
        !space.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredSpaces = filterSpaces(data || []);

  return (
    <div className='container mx-auto pt-10'>
      <Search
        spaceTypeFilter={spaceTypeFilter}
        searchQuery={searchQuery}
        setspaceTypeFilter={setSpaceTypeFilter}
        setSearchQuery={setSearchQuery}
      />

      <div className='flex mt-20 justify-between flex-wrap'>
        {filteredSpaces.map(space => (
          <SpaceCard key={space._id} space={space} />
        ))}
      </div>
    </div>
  );
};

export default Spaces;