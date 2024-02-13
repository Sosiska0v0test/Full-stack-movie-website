import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHeart, FaSearch } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useSelector } from 'react-redux'


function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  const hover = "hover:text-subMain transitions text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies/${search}`);
      setSearch(search);
    } else {
      navigate(`/movies`);
    }
  };

  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* Logo */ }
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-full h-12 object-contain"
              />
            </Link>
          </div>
          {/* Search Form */ }
          <div className="col-span-3 flex items-center">
            <form onSubmit={ handleSearch } className="w-full text-sm bg-borderSearch rounded flex-btn gap-4">
              <button
                type="submit"
                className="bg-subMain flex-colo m-1 w-14 h-12 rounded text-white"
              >
                <FaSearch />
              </button>

              <input type="search" value={ search } onChange={ (e) => setSearch(e.target.value) } placeholder='Шукайте фільми тут...'
                className='font-medium placeholder:text-placeholder text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black'></input>
            </form>
          </div>
          {/* Menus */ }
          <div className='col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center'>
            <NavLink to='/movies' className={ Hover }>Фільми</NavLink>
            <NavLink to='/about-us' className={ Hover }>Про нас</NavLink>
            <NavLink to='/contact-us' className={ Hover }>Зв'язатися з нами</NavLink>
            <NavLink to={ userInfo?.isAdmin ? "/dashboard" : userInfo ? "/profile" : "/login" } className={ Hover }>
              { userInfo ? (
                <img
                  src={ userInfo?.image ? userInfo?.image : "/images/user.jfif" }
                  alt={ userInfo?.fullName }
                  className="w-10 h-10 rounded-full object-cover "
                />
              ) : (
                <CgUser className="w-8 h-8" />
              ) }
            </NavLink>
            <NavLink to='/favorites' className={ `${Hover} relative` }>
              <FaHeart className='w-8 h-8' />
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                { likedMovies?.length || 0 }
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
