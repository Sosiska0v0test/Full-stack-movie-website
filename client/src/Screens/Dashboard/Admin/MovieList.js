import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllMoviesAction, deleteMovieAction, getAllMoviesAction } from '../../../Redux/Actions/MoviesActions'
import toast from 'react-hot-toast'
import Loader from '../../../Components/Notification/Loader'
import { Empty } from './../../../Components/Notification/Empty'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'
import { FaRegListAlt } from 'react-icons/fa'

function MovieList() {
  const dispatch = useDispatch();
  const sameClass =
    'text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain';

  // all movies
  const { isLoading, isError, movies, pages, page, totalMovies } = useSelector(
    (state) => state.getAllMovies
  );
  // delete
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );
  // delete all
  const { isLoading: allLoading, isError: allError } = useSelector(
    (state) => state.deleteAllMovies
  );

  // delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm('Are you sure you want do delete this movie?') &&
      dispatch(deleteMovieAction(id));
  };

  // delete all movies handler
  const deleteAllMoviesHandler = () => {
    window.confirm('Are you sure you want do delete all movies?') &&
      dispatch(deleteAllMoviesAction());
  };

  // useEffect
  useEffect(() => {
    dispatch(getAllMoviesAction({}));
  }, [dispatch]);

  // error
  useEffect(() => {
    // errors
    if (isError || deleteError || allError) {
      toast.error(isError || deleteError || allError);
    }
  }, [isError, deleteError, allError]);

  // pagination next and pev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };

  // dashboard datas
  const DashboardData = [
    {
      bg: 'bg-pink-600',
      icon: FaRegListAlt,
      title: 'Фільми',
      total: isLoading ? 'Завантаження...' : totalMovies || 0,
    },
  ]

  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
          { DashboardData.map((data, index) => (
            <div key={ index } className='p-4 pr-16 rounded bg-main border-border grid grid-cols-4 gap-2'>
              <div className={ `col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}` }>
                <data.icon />
              </div>
              <div className='col-span-3 text-center'>
                <h2>{ data.title }</h2>
                <p className='mt-2 text-center font-bold'>{ data.total }</p>
              </div>
            </div>
          )) }
        </div>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>
            Список фільмів
          </h2>
          { movies?.length > 0 && (
            <button
              disabled={ allLoading }
              onClick={ deleteAllMoviesHandler }
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              { allLoading ? 'Видалення...' : 'Видалити все' }
            </button>
          ) }
        </div>
        { isLoading || deleteLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table data={ movies } admin={ true } onDeleteHandler={ deleteMovieHandler } />
            {/* Loading More */ }
            <div className='w-full flex-rows gap-6 my-5'>
              <button onClick={ prevPage } disabled={ page === 1 } className={ sameClass }>
                <TbPlayerTrackPrev className='text-xl' />
              </button>
              <button onClick={ nextPage } disabled={ page === pages } className={ sameClass }>
                <TbPlayerTrackNext className='text-xl' />
              </button>
            </div>
          </>
        ) : (
          <Empty message='You have no movies' />
        ) }
      </div>
    </SideBar>
  )
}

export default MovieList