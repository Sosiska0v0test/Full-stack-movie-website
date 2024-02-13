import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { DateFormat, ShortUpercaseId } from './Notification/Empty';

const Head = 'text-xs text-left text-dry font-semibold px-6 py-2 uppercase';
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3';

//rows
const Rows = ({ data, users, OnEditFunction, onDeleteFunction }) => {
  return (
    <tr>
      {/* users */ }
      {
        users ? (
          <>
            <td className={ `${Text}` }>
              <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                <img className='h-full w-full object-cover' src={ `${data?.image ? data.image : '/images/user.jfif'}` } alt={ data?.fullName } />
              </div>
            </td>
            <td className={ `${Text}` }>{ data?._id ? ShortUpercaseId(data?._id) : '2R75T8' }</td>
            <td className={ `${Text}` }>{ DateFormat(data?.createdAt) }</td>
            <td className={ `${Text}` }>{ data?.fullName }</td>
            <td className={ `${Text}` }>{ data?.email }</td>
            <td className={ `${Text}` }>{ data?.isAdmin ? "Admin" : "User" }</td>
            <td className={ `${Text}` }>{ data?.password }</td>
            <td className={ `${Text} float-right flex-rows gap-2` }>
              {
                !data?.isAdmin && <button onClick={ () => onDeleteFunction(data?._id) } className='bg-delete text-white rounded flex-colo w-7 h-7'>
                  <MdDelete />
                </button>
              }
            </td>
          </>
        ) : (
          // Categories
          <>
            <td className={ `${Text} font-bold` }>{ data?._id ? ShortUpercaseId(data?._id) : '2R75T8' }</td>
            <td className={ `${Text}` }>{ DateFormat(data?.createdAt) }</td>
            <td className={ `${Text}` }>{ data.title }</td>
            <td className={ `${Text} float-right flex-rows gap-2` }>
              <button onClick={ () => OnEditFunction(data) } className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                Редагувати <FaEdit className='text-orange-400' />
              </button>
              <button onClick={ () => onDeleteFunction(data?._id) } className='bg-delete text-white rounded flex-colo w-7 h-7'>
                <MdDelete />
              </button>
            </td>
          </>
        )
      }
    </tr>
  )
}

//table
function Table2({ data, users, OnEditFunction, onDeleteFunction }) {

  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
      <table className='w-full table-auto border border-border divide-y divide-border'>
        <thead>
          <tr className='bg-dryGray'>
            {
              users ? (
                <>
                  <th scope='col' className={ `${Head}` }>
                    Фото
                  </th>
                  <th scope='col' className={ `${Head}` }>
                    Id
                  </th>
                  <th scope='col' className={ `${Head}` }>
                    Дата
                  </th>
                  <th scope='col' className={ `${Head}` }>
                    Ім'я
                  </th>
                  <th scope='col' className={ `${Head}` }>
                    Email
                  </th>
                  <th scope='col' className={ `${Head}` }>
                    Роль
                  </th>
                  <th scope='col' className={ `${Head}` }>
                    Пароль
                  </th>
                </>
              ) : (
                <>
                  <th scope='col' className={ `${Head}` }>
                    Id
                  </th>
                  <th scope='col' className={ `${Head}` }>
                    Дата
                  </th>
                  <th scope='col' className={ `${Head}` }>
                    Ім'я
                  </th>
                </>
              )
            }

            <th scope='col' className={ `${Head} text-end` }>
              Дія
            </th>
          </tr>
        </thead>
        <tbody className='bg-main divide-y divide-gray-800'>
          { data.map((data, i) =>
            <Rows key={ i } data={ data } users={ users } OnEditFunction={ OnEditFunction } onDeleteFunction={ onDeleteFunction } />
          ) }
        </tbody>
      </table>
    </div>
  );
}

export default Table2;
