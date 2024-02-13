import React, { useState } from 'react'
import Titles from './../Titles'
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs'
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from '../Stars';
import Loader from '../Notification/Loader';
import { Empty } from './../Notification/Empty';
import { useDispatch, useSelector } from 'react-redux';
import { IfMovieLiked, LikeMovie } from '../../Context/Functionalities';

const SwiperTop = ({ prevEl, nextEl, movies }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };
  return (
    <Swiper navigation={ { nextEl, prevEl } }
      autoplay={ true } speed={ 1000 } loop={ true } modules={ [Navigation, Autoplay] }
      breakpoints={ {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      } }
    >
      {
        movies?.map((movie, index) => (
          <SwiperSlide key={ index }>
            <div className='p-2 hovered rounded-lg overflow-hidden '>
              <img src={ movie?.image ? movie.image : "/images/user.jfif" } alt={ movie?.name } className='w-full h-68 object-cover rounded-lg' />
              <div className='px-4 hoveres gap-2 text-center rounded-lg absolute bg-black bg-opacity-80 top-0 left-0 right-0 bottom-0 '>
                <button
                  onClick={ () => LikeMovie(movie, dispatch, userInfo) }
                  disabled={ isLiked(movie) || isLoading }
                  className={ `w-12 h-12 flex-colo transitions hover:bg-white hover:text-red-500 rounded-full
               ${isLiked(movie) ? "bg-white" : "bg-white bg-opacity-30 text-white"}
                text-red-500`}
                >
                  <FaHeart />
                </button>
                <Link className='font-semibold text-xl trancuted line-clamp-2' to={ `/movie/${movie?._id}` }>
                  { movie?.name }
                </Link>
                <div className='flex gap-2 text-star'>
                  <Rating value={ movie?.rate } />
                </div>
              </div>
            </div>
          </SwiperSlide>
        )) }
    </Swiper>
  )
}

function TopRated({ movies, isLoading }) {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const classNames = 'hover:bg-main transition text-sm rounded w-8 h-8 flex-colo bg-subMain text-White'

  return (
    <div className='my-16 '>
      <Titles title='В топі рейтингу' Icon={ BsBookmarkStarFill } />
      <div className='mt-10'>
        {
          isLoading ? <Loader /> : movies?.length > 0 ?
            <SwiperTop nextEl={ nextEl } prevEl={ prevEl } movies={ movies } />
            : <Empty message="It seem's like we dont have any movie" />
        }
        <div className='w-full px-1 flex-rows gap-6 pt-12'>
          <button className={ classNames } ref={ (node) => setPrevEl(node) }>
            <BsCaretLeftFill />
          </button>
          <button className={ classNames } ref={ (node) => setNextEl(node) }>
            <BsCaretRightFill />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopRated