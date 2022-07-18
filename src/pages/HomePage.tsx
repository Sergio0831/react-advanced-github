import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../hooks/debounce';
import { useSearchUsersQuery } from '../services/github.api';

const HomePage = () => {
  const [search, setSearch] = useState<string>('');
  const debounced = useDebounce(search);
  const { data, isError, isLoading } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    console.log(search);
  }, [debounced]);

  return (
    <div className='px-5 pt-10 flex justify-center h-full'>
      {isError && (
        <p className='text-center text-red-600'>Something went wrong!</p>
      )}

      <div className='relative w-[560px]'>
        <input
          ref={inputRef}
          type='text'
          className='border-b py-2 px-4 h-[42px] mb-2 border-d outline-none focus:border-gray-400'
          placeholder='Search user'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white'></ul>
      </div>
    </div>
  );
};
export default HomePage;
