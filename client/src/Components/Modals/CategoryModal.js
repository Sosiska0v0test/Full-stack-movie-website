import React, { useEffect, useState } from 'react'
import MainModal from './MainModal'
import { Input } from '../UsedInputs'
import { useDispatch, useSelector } from 'react-redux'
import { createCategoryAction, updateCategoryAction } from '../../Redux/Actions/CategoriesActions';
import toast from 'react-hot-toast';

function CategoryModal({ modalOpen, setModalOpen, category }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch()

  const { isLoading, isError, isSuccess } = useSelector((state) => state.categoryCreate)
  const { isLoading: uploading, isError: upError, isSuccess: upSuccess } = useSelector((state) => state.categoryCreate)

  // create category handler
  const submitHandler = (e) => {
    e.preventDefault()
    if (title) {
      if (category) {
        dispatch(updateCategoryAction(category._id, { title: title }))
        setModalOpen(!modalOpen)
      } else {
        dispatch(createCategoryAction({ title: title }))
        setTitle("")
      }
    }
    else {
      toast.error("Введіть назву категорії🤭")
    }
  }

  // useEffect
  useEffect(() => {
    //error
    if (upError || isError) {
      toast.error(upError || isError)
      dispatch({
        type: isError ? "CREATE_CATEGORIES_RESET" : "UPDATE_CATEGORIES_RESET"
      })
    }
    //success
    if (isSuccess || upSuccess) {
      dispatch({
        type: isError ? "CREATE_CATEGORIES_RESET" : "UPDATE_CATEGORIES_RESET"
      })
    }
    //if category is not null then set title to category title
    if (category) {
      setTitle(category?.title)
    }
    //if modal is closed then set title to empty
    if (modalOpen === false) {
      setTitle("")
    }
  }, [dispatch, isSuccess, isError, upSuccess, upError, category, modalOpen]);


  return (
    <MainModal modalOpen={ modalOpen } setModalOpen={ setModalOpen }>
      <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
        <h2 className='text-3xl font-bold'>{ category ? 'Редагування' : 'Створення' }</h2>
        <form className='flex flex-col gap-6 text-left mt-6'
          onSubmit={ submitHandler }
        >
          <Input
            label='Назва категорії'
            placeholder={ 'Драма' }
            type='text' bg={ false }
            value={ title }
            onChange={ (e) =>
              setTitle(e.target.value) }
          />
          <button
            disabled={ isLoading || uploading }
            type='submit'
            className='w-full flex-rows gap-4 py-3 transitions font-lg bg-subMain hover:bg-transparent border-2 border-subMain rounded text-white'>
            {
              isLoading || uploading ? "Завантаження..." : category ? 'Редагування' : 'Створення'
            }
          </button>
        </form>
      </div>
    </MainModal>
  )
}

export default CategoryModal