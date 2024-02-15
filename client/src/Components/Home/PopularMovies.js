import React from 'react';
import Titles from '../Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Movie';
import Loader from '../Notification/Loader';
import Empty from '../Notification/Loader';


function PopularMovies({ isLoading, movies }) {
  return (
    <div className='my-16'>
      <Titles title="Популярні" Icon={ BsCollectionFill } />
      {
        isLoading ? <Loader /> : movies?.length > 0 ? (
          <div className='grid sm:mt-12 mt-7 xl:grid-cols-7 2xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 h-86 w-full'>
            {
              movies?.slice(0, 8).map((movie, index) => (
                <Movie key={ index } movie={ movie } />
              ))
            }
          </div>
        ) : (
          <div className='mt-6'>
            <Empty message="It seem's like we dont have any movie" />
          </div>
        )
      }

    </div>
  )
}

export default PopularMovies
