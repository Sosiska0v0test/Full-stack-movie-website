import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useParams } from 'react-router-dom';
import MovieInfo from '../Components/Single/MovieInfo';
import MovieCasts from '../Components/Single/MovieCasts';
import MoviesRates from '../Components/Single/MoviesRates';
import Titles from '../Components/Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Components/Movie';
import ShareMovieModal from '../Components/Modals/ShareModal';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction } from '../Redux/Actions/MoviesActions';
import Loader from '../Components/Notification/Loader';
import { ImFilm } from 'react-icons/im';
import { DownloadVideo } from '../Context/Functionalities';
import { SidebarContext } from '../Context/DrawerContext';
import FileSaver from "file-saver";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setprogress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // use Selector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const { movies } = useSelector((state) => state.getAllMovies);
  // related movies
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);

  // download movie Video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then((data) => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };

  // use Effect
  useEffect(() => {
    //  movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      { isLoading ? (
        <div className={ sameClass }>
          <Loader />
        </div>
      ) : isError ? (
        <div className={ sameClass }>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <ImFilm />
          </div>
          <p className="text-border text-sm">Щось пішло не так😯</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={ modalOpen }
            setModalOpen={ setModalOpen }
            movie={ movie }
          />
          <MovieInfo
            movie={ movie }
            setModalOpen={ setModalOpen }
            DownloadVideo={ DownloadMovieVideo }
            progress={ progress }
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={ movie } />
            {/* rate */ }
            <MoviesRates movie={ movie } />
            {/* related */ }
            { RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Схожі фільми" Icon={ BsCollectionFill } />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-7 2xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
                  { RelatedMovies?.map((movie) => (
                    <Movie key={ movie?._id } movie={ movie } />
                  )) }
                </div>
              </div>
            ) }
          </div>
        </>
      ) }
    </Layout>
  );
}

export default SingleMovie;



