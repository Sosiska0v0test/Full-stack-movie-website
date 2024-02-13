import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { HiPlus, HiViewGridAdd } from 'react-icons/hi'
import Table2 from '../../../Components/Table2'
import CategoryModal from '../../../Components/Modals/CategoryModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryAction, getAllCategoriesAction } from '../../../Redux/Actions/CategoriesActions'
import Loader from '../../../Components/Notification/Loader'
import { Empty } from '../../../Components/Notification/Empty'
import toast from 'react-hot-toast'

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch()

  // useSelectors
  const {
    isLoading: catLoading,
  } = useSelector((state) => state.categoryGetAll);

  // all categories 
  const { categories, isLoading } = useSelector(state => state.categoryGetAll)
  // delete category
  const { isSuccess, isError } = useSelector(state => state.categoryDelete)

  const adminDeleteCategory = (id) => {
    if (window.confirm("Ви впевненні що хочете видалити цю категорію?")) {
      dispatch(deleteCategoryAction(id))
    }
  }

  const OnEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  }

  useEffect(() => {
    dispatch(getAllCategoriesAction())
    if (isError) {
      toast.error(isError);
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch, isError, isSuccess]);

  // dashboard datas
  const DashboardData = [
    {
      bg: 'bg-green-600',
      icon: HiViewGridAdd,
      title: 'Всі категорії',
      total: catLoading ? 'Завантаження...' : categories?.length || 0,
    },
  ]

  return (
    <SideBar>

      <CategoryModal modalOpen={ modalOpen } setModalOpen={ setModalOpen } category={ category } />
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
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>
            Категорії
          </h2>
          <button
            onClick={ () => setModalOpen(true) }
            className='bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded'>
            <HiPlus /> Створити
          </button>
        </div>
        { isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2 data={ categories } users={ false } OnEditFunction={ OnEditFunction } onDeleteFunction={ adminDeleteCategory } />
        ) : (
          <Empty message='Тут не має категорій' />
        ) }

      </div>
    </SideBar>
  )
}

export default Categories