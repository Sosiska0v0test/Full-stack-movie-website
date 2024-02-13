import React, { useContext, useEffect } from 'react'
import SideBar from './SideBar'
import Table from '../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFavoriteMoviesAction, getFavoriteMoviesAction } from '../../Redux/Actions/userActions'
import toast from 'react-hot-toast'
import Loader from './../../Components/Notification/Loader';
import { Empty } from '../../Components/Notification/Empty'
import { FaHeart } from "react-icons/fa";
import { DownloadVideo } from '../../Context/Functionalities'
import FileSaver from 'file-saver'
import { SidebarContext } from '../../Context/DrawerContext'

function FavoritesMovies() {
  const dispatch = useDispatch();
  const { progress, setprogress } = useContext(SidebarContext);
  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );
  // delete
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMovies);

  // delete movies handler
  const deleteMoviesHandler = () => {
    window.confirm('Are you sure you want to delete all movies?') &&
      dispatch(deleteFavoriteMoviesAction());
  };

  // download movie Video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then((data) => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };

  // useEffect
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
  }, [dispatch, isSuccess]);

  // useEffect
  useEffect(() => {
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? 'GET_FAVORITE_MOVIES_RESET'
          : 'DELETE_FAVORITE_MOVIES_RESET',
      });
    }
  }, [dispatch, isError, deleteError]);

  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <div className='flex items-center gap-2'>
            <h2 className='text-xl font-bold'>Збережені фільми</h2>
            <FaHeart className='text-subMain w-5 h-5' />
          </div>
          { likedMovies?.length > 0 && (
            <button
              disabled={ deleteLoading }
              onClick={ deleteMoviesHandler }
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              { deleteLoading ? 'Видалення...' : 'Видалити все' }
            </button>
          ) }
        </div>
        { isLoading ? (
          <Loader />
        ) : likedMovies.length > 0 ? (
          <Table
            data={ likedMovies }
            admin={ false }
            downloadVideo={ DownloadMovieVideo }
            progress={ progress }
          />
        ) : (
          <Empty message="Ваш список збережених фільмів порожній" />
        ) }
      </div>
    </SideBar>
  );
}

export default FavoritesMovies;
