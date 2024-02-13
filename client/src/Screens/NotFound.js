import React from 'react'
import { TbHome } from "react-icons/tb";
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='flex-colo gap-8 w-full min-h-screen text-white bg-black lg:py-20 py-10 px-6'>
      <img className='w-full h-96 object-contain' src='/images/NotFound.jpeg' alt='notFound' />
      <h1 className='lg:text-4xl font-bold'>Сторінку не знайдено</h1>
      <p className='font-medium text-border italic leading-6'>
        Сторінка, яку ви шукаєте, не існує. Можливо, ви неправильно ввели URL
      </p>
      <Link to='/' className='bg-subMain transitions text-white flex-rows gap-2 font-medium py-3 hover:text-main px-6 rounded-md'>
        <TbHome className='h-6 w-6' />Home
      </Link>
    </div>
  )
}

export default NotFound