'use client';

import { useState } from 'react';

import Search from '../Search/Search';

const PageSearch = () => {
  const [spaceTypeFilter, setspaceTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Search
      spaceTypeFilter={spaceTypeFilter}
      searchQuery={searchQuery}
      setspaceTypeFilter={setspaceTypeFilter}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default PageSearch; 