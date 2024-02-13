import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import FlexMovieItems from '../FlexMovieItems';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Loader from '../../../src/Components/Notification/Loader';
import { ImFilm } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { IfMovieLiked, LikeMovie } from '../../Context/Functionalities';

const Swipper = ({ sameClass, movies }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };

  return (
    <Swiper
      direction="vertical"
      slidesPerView={ 1 }
      loop={ true }
      speed={ 1000 }
      modules={ [Autoplay] }
      autoplay={ { delay: 4000, disableOnInteraction: false } }
      className={ sameClass }
    >
      { movies?.slice(0.6).map((movie, index) => (
        <SwiperSlide key={ index } className='relative rounded overflow-hidden'>
          <img src={ movie?.titleImage ? movie.titleImage : "/images/user.jfif" } alt={ movie?.name } className='w-full h-full object-cover' />
          <div className='absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4'>
            <h1 className='xl:text-4xl truncate capitaliz font-sans sm:text-2xl text-xl font-bold'>
              { movie?.name }
            </h1>
            <div className='flex gap-5 items-center text-dryGray'>
              <FlexMovieItems movie={ movie } />
            </div>
            <div className='flex gap-5 items-center text-dryGray'>
              <Link to={ `/movie/${movie?._id}` } className='bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs'>
                Дивитися
              </Link>
              <button
                onClick={ () => LikeMovie(movie, dispatch, userInfo) }
                disabled={ isLiked(movie) || isLoading }
                className={ `bg-white
              ${isLiked(movie) ? "text-red-500" : "text-white"}
               hover:text-red-500 transitions px-4 py-3 rounded text-sm bg-opacity-30`}
              >
                <FaHeart className='h-4 w-4' />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))
      }
    </Swiper>
  )
}

function Banner({ movies, isLoading }) {
  const sameClass = 'w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48'
  return (
    <div className="relative w-full">
      { isLoading ? (
        <div className={ sameClass }>
          <Loader />
        </div>
      ) : movies?.length > 0 ? (
        <Swipper sameClass={ sameClass } movies={ movies } />
      ) : (
        <div className={ sameClass }>
          <div className='flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl'>
            <ImFilm />
          </div>
          <p className='text-border text-sm'>На цьому сайті поки що не має фільмів😬</p>
        </div>
      ) }
    </div >
  )
}

export default Banner