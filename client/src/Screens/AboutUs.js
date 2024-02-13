import React from 'react'
import Layout from './../Layout/Layout'
import Head from '../Components/Head'

function AboutUs() {
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 my-6'>
        <Head title='Про нас' />
        <div className='xl:py-20 py-10 px-4'>
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            <div>
              <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
                Ласкаво просимо на наш сайт
              </h3>
              <div className='mt-3 text-sm leading-8 text-text'>
                <p>
                  Topolya - це веб-сайт з великим асортиментом фільмів різних жанрів, доступних для перегляду онлайн.
                  Його унікальність полягає в тому, що він надає користувачам доступ до найактуальніших та найпопулярніших
                  фільмів у високій якості безкоштовно. Завдяки зручному інтерфейсу та швидкому пошуку, Topolya стає ідеальним
                  вибором для шанувальників кіно, які шукають зручний спосіб насолоджуватися своїми улюбленими стрічками.
                </p>
              </div>
              <div className='grid md:grid-cols-2 gap-6 mt-8'>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl block font-extrabold'>
                    10 000 +
                  </span>
                  <h4 className='text-lg font-semibold my-1'>Фільмів у нас на сайті</h4>
                  <p className='mb-0 text-text leading-7 text-sm '>
                    Нові фільми що дня!
                  </p>
                </div>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl block font-extrabold'>
                    8 000 +
                  </span>
                  <h4 className='text-lg font-semibold my-1'>Користувачів</h4>
                  <p className='mb-0 text-text leading-7 text-sm '>
                    Раді бачити нових користувачів!
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-10 lg:mt-0'>
              <img src='/images/OIG2 (1).jfif' alt='aboutus' className='w-full xl:block hidden h-header rounded-lg object-cover' />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs