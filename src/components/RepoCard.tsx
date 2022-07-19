import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addToFavorites,
  removeFromFavorites
} from '../features/github/github.slice';
import { IRepo } from '../models';

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.github);
  const [isFavorite, setIsFavorite] = useState(
    favorites.includes(repo.html_url)
  );

  const handleAddToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addToFavorites(repo.html_url));
    setIsFavorite(true);
  };

  const handleRemoveFromFavorites = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    dispatch(removeFromFavorites(repo.html_url));
    setIsFavorite(false);
  };

  return (
    <div className='border py-3 px-5 rounded mb-2 hover:bg-gray-100 transition-all'>
      <a href={repo.html_url}>
        <h2 className='text-lg font-bold'>{repo.full_name}</h2>
        <p className='text-sm'>
          Forks: <span className='font-bold mr-2'>{repo.forks}</span>
          Watchers: <span className='font-bold mr-2'>{repo.watchers}</span>
        </p>
        <p className='text-sm font-thin'>{repo?.description}</p>
      </a>
      <button
        className={`py-2 px-4 ${
          isFavorite ? 'bg-red-400' : 'bg-yellow-400'
        } rounded transition-all hover:shadow-md`}
        onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
      >
        {isFavorite ? 'Remove' : 'Add'}
      </button>
    </div>
  );
};
export default RepoCard;
