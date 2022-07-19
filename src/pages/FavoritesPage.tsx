import { useAppSelector } from '../app/hooks';

const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.github);

  return (
    <div className='px-5 pt-10 flex justify-center h-full'>
      <ul className='list-none'>
        {favorites.length === 0 ? (
          <p>No items</p>
        ) : (
          favorites.map((fav) => (
            <li key={fav}>
              <a target='_blank' href={fav}>
                {fav}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default FavoritesPage;
