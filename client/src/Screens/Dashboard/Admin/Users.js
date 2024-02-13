import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import Table2 from '../../../Components/Table2'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, getAllUsersAction } from '../../../Redux/Actions/userActions'
import Loader from '../../../Components/Notification/Loader';
import { Empty } from '../../../Components/Notification/Empty'
import { FaUser } from 'react-icons/fa'


function Users() {
  const dispatch = useDispatch()
  const { isLoading, isError, users, } = useSelector(state => state.adminGetAllUsers)

  const {
    isLoading: userLoading,
  } = useSelector((state) => state.adminGetAllUsers);

  //delete
  const { isError: deleteError, isSuccess, } = useSelector(state => state.adminDeleteUser)

  //delete user handler
  const deleteMoviesHandler = (id) => {
    if (window.confirm("Ви впевненні що хочете видалити цього користувача?")) {
      dispatch(deleteUserAction(id))
    }
  }

  //useEffect
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET" })
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  // dashboard datas
  const DashboardData = [
    {
      bg: 'bg-blue-700',
      icon: FaUser,
      title: 'Всі користувачі',
      total: userLoading ? 'Завантаження..' : users?.length || 0,
    },
  ]

  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-bold'>
          Users
        </h2>
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
        { isLoading ? (
          <Loader />
        ) : users.length > 0 ? (
          <Table2 data={ users } users={ true } onDeleteFunction={ deleteMoviesHandler } />
        ) : (
          <Empty message='Тут поки що порожньо...' />
        ) }
      </div>
    </SideBar>
  )
}

export default Users