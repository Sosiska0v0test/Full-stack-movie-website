import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import AboutUs from './Screens/AboutUs';
import NotFound from './Screens/NotFound';
import ContactUs from './Screens/ContactUs';
import MoviesPage from './Screens/Movies';
import SingleMovie from './Screens/SingleMovie';
import WatchPage from './Screens/WatchPage';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Dashboard/Profile';
import Aos from 'aos';
import Password from './Screens/Dashboard/Password';
import FavoritesMovies from './Screens/Dashboard/FavoritesMovies';
import MovieList from './Screens/Dashboard/Admin/MovieList';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Categories from './Screens/Dashboard/Admin/Categories';
import Users from './Screens/Dashboard/Admin/Users';
import AddMovies from './Screens/Dashboard/Admin/AddMovies';
import ScrollOnTop from './ScrollOnTop';
import ToastContainer from './Components/Notification/ToastContainer';
import { AdminProtectionRouter, ProtectedRouter } from './ProtectedRouter';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAction } from './Redux/Actions/CategoriesActions';
import { getAllMoviesAction } from './Redux/Actions/MoviesActions';
import { getFavoriteMoviesAction } from './Redux/Actions/userActions';
import toast from 'react-hot-toast';
import EditMovie from './Screens/Dashboard/Admin/EditMovie';
import DrawerContext from './Context/DrawerContext';

function App() {
	Aos.init();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { isError, isSuccess } = useSelector((state) => state.userLikeMovie);
	const { isError: catError } = useSelector((state) => state.categoryGetAll);

	useEffect(() => {
		dispatch(getAllCategoriesAction());
		dispatch(getAllMoviesAction({}));
		if (userInfo) {
			dispatch(getFavoriteMoviesAction());
		}
		if (isError || catError) {
			toast.error(isError || catError);
			dispatch({ type: "LIKE_MOVIE_RESET" });
		}
		if (isSuccess) {
			dispatch({ type: "LIKE_MOVIE_RESET" });
		}
	}, [dispatch, userInfo, isError, catError, isSuccess]);

	return (
		<>
			<BrowserRouter>
				<ToastContainer />
				<DrawerContext>
					<ScrollOnTop>
						<Routes>
							{ /************* * PUBLIC ROUTERS **************/ }
							<Route path='/' element={ <HomeScreen /> } />
							<Route path='/about-us' element={ <AboutUs /> } />
							<Route path='/contact-us' element={ <ContactUs /> } />
							<Route path='/movies' element={ <MoviesPage /> } />
							<Route path="/movies/:search" element={ <MoviesPage /> } />
							<Route path='/movie/:id' element={ <SingleMovie /> } />
							<Route path='/watch/:id' element={ <WatchPage /> } />
							<Route path='/login' element={ <Login /> } />
							<Route path='/register' element={ <Register /> } />
							<Route path='*' element={ <NotFound /> } />
							{ /************* * PRIVATE PUBLIC ROUTERS **************/ }
							<Route element={ <ProtectedRouter /> }>
								<Route path='/profile' element={ <Profile /> } />
								<Route path='/password' element={ <Password /> } />
								<Route path='/favorites' element={ <FavoritesMovies /> } />
								{ /************* * ADMIN ROUTERS **************/ }
								<Route element={ <AdminProtectionRouter /> }>
									<Route path='/movieslist' element={ <MovieList /> } />
									<Route path='/dashboard' element={ <Dashboard /> } />
									<Route path='/categories' element={ <Categories /> } />
									<Route path='/users' element={ <Users /> } />
									<Route path='/addmovie' element={ <AddMovies /> } />
									<Route path='/edit/:id' element={ <EditMovie /> } />
								</Route>
							</Route>
						</Routes>
					</ScrollOnTop >
				</DrawerContext>
			</BrowserRouter>
		</>
	);
}

export default App;
