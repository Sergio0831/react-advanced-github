import React, { useEffect, useRef, useState } from 'react';
import RepoCard from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery
} from '../services/github.api';

const HomePage = () => {
  const [search, setSearch] = useState<string>('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const {
    data: users,
    isError,
    isLoading
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setDropdown(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users]);

  const clickHandler = (userName: string) => {
    fetchRepos(userName);
    setDropdown(false);
    setSearch('');
  };

  return (
    <div className='px-5 pt-10 grid justify-center h-full'>
      {isError && (
        <p className='text-center text-red-600'>Something went wrong!</p>
      )}

      <div className='relative w-[560px]'>
        <input
          ref={inputRef}
          type='text'
          className='border-b py-2 px-4 h-[42px] mb-2 border-d outline-none focus:border-gray-400 w-full'
          placeholder='Search user'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdown && (
          <ul className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll'>
            {isLoading && <p className='text-center'>Loading...</p>}
            {users &&
              users.map((user) => (
                <li
                  key={user.id}
                  onClick={() => clickHandler(user.login)}
                  className='py-2 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                >
                  {user.login}
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className='container'>
        {areReposLoading && <p className='text-center'>Repos are loading...</p>}
        {repos?.map((repo) => (
          <RepoCard repo={repo} key={repo.id} />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
