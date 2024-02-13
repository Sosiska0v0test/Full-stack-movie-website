import React from 'react'
import { BsCollectionPlay } from 'react-icons/bs'
import { FiHeart } from 'react-icons/fi'
import { PiSignInBold } from "react-icons/pi";
import { NavLink } from 'react-router-dom'
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { useSelector } from 'react-redux';

function MobileFooter() {
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  const active = 'bg-subMain text-white'
  const inActive = 'transitions text-2xl flex-colo hover:bg-dryGray hover:text-main text-white rounded-md px-4 py-3'
  const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : inActive
  return (
    <>
      <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
        <div className='bg-dry rounded-md flex-btn w-full p-1'>
          <NavLink to='/movies' className={ Hover }>
            <BsCollectionPlay />
          </NavLink>
          <NavLink to='/favorites' className={ Hover }>
            <div className='relative'>
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-green-400 text-main font-bold absolute -top-5 -right-1">
                { likedMovies?.length > 0 ? likedMovies?.length : 0 }
              </div>
              <FiHeart />
            </div>
          </NavLink>
          <NavLink to='/login' className={ Hover }>
            <PiSignInBold />
          </NavLink>
          <NavLink to='/about-us' className={ Hover }>
            <HiOutlineUserGroup />
          </NavLink>
          <NavLink to='/contact-us' className={ Hover }>
            <BiPhoneCall />
          </NavLink>

        </div>
      </footer>
    </>
  )
}

export default MobileFooter
