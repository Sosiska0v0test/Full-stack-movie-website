import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { IfMovieLiked, LikeMovie } from '../Context/Functionalities';

function Movie({ movie }) {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = IfMovieLiked(movie);

  return (
    <>
      <div className='p-3 bg-main rounded-lg hover:scale-95 transitions relative overflow-hidden'>
        <Link to={ `/movie/${movie?._id}` } className='w-full'>
          <img src={ movie?.image ? movie?.image : "/images/user.jfif" } alt={ movie?.name } className='h-86 w-full rounded-lg object-cover' />
        </Link>
        <div className='absolute flex-btn gap-2 bottom-0 right-0 left-2 bg-main bg-opacity-60 text-white px-6 py-5'>
          <h3 className='font-semibold truncate'>{ movie?.name }</h3>
          <button
            onClick={ () => LikeMovie(movie, dispatch, userInfo) }
            disabled={ isLiked || isLoading }
            className={ `h-12 w-12 text-sm flex-colo transitions
           ${isLiked ? "bg-white border-white" : "bg-subMain text-white "}
            hover:bg-transparent rounded-full border-2 border-subMain text-red-500`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </>
  )
}

export default Movie