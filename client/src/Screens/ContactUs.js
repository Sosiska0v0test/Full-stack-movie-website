import React from 'react'
import Layout from '../Layout/Layout'
import { FiMail, FiMapPin } from 'react-icons/fi'
import HeadContact from '../Components/HeadContact'

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: "Електронна адреса",
      info: "",
      icon: FiMail,
      contact: "groslaiter@gmail.com",
    },
    {
      id: 2,
      title: "Локація",
      info: "Ukraine",
      icon: FiMapPin,
      contact: "",
    },
  ]
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 my-6'>
        <HeadContact title="Зв'язатися з нами" />
        <div className='mt-20 text-sm leading-8 text-text'>
          <p>
            Інформація, що розміщена на нашому веб-сайті, є загальнодоступною у мережах Інтернету.
            У випадку, якщо наш ресурс порушив ваші авторські права, будь ласка, звертайтеся до адміністрації
            сайту за електронною адресою вказаною нижче, і ми оперативно видалимо відповідний контент.
          </p>
        </div>
        <div className='grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grig-cols-2 xl:gap-8'>
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            {
              ContactData.map((item) => (
                <div key={ item.id } className="border border-main flex-colo p-10 bg-dry rounded-lg text-center">
                  <span className='flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl'>
                    <item.icon />
                  </span>
                  <h5 className='text-xl font-semibold mb-2'>{ item.title }</h5>
                  <p className='mb-0 text-sm text-text leading-7'>
                    <a href={ `mailto:{item.contact}` } className='text-subMain'>
                      { item.contact }
                    </a>
                    { item.info }
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs

