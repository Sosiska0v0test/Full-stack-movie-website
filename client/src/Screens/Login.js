import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UsedInputs'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { LoginValidation } from '../Components/Validation/UserValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { InlineError } from './../Components/Notification/Error'
import { loginAction } from '../Redux/Actions/userActions'
import toast from 'react-hot-toast'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userLogin
  );

  //validate user
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(LoginValidation),
  })

  // on submit
  const onSubmit = (data) => {
    dispatch(loginAction(data))
  }

  // useEffect
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard")
    }
    else if (userInfo) {
      navigate("/profile")
    }
    if (isSuccess) {
      toast.success(`${userInfo?.fullName} Раді бачити знову 🤗`)
    }
    if (isError) {
      toast.error(isError)
      dispatch({ type: "USER_LOGIN_RESET" })
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);

  return (
    <Layout>
      <div className='container mx-auto px-2 my-24 flex-colo'>
        <form onSubmit={ handleSubmit(onSubmit) } className='w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-main'>
          <img src='/images/logo.png' alt='logo' className='w-full h-12 object-contain' />

          <div className='w-full'>
            <Input label='Електронна пошта' placeholder='topolya.movie@gmail.com' type='email' name='email' register={ register('email') } bg={ true } />
            {
              errors.email && <InlineError text={ errors.email.message } />
            }
          </div>

          <div className='w-full'>
            <Input label='Пароль' placeholder='******' type='password' name='password' register={ register('password') } bg={ true } />
            {
              errors.password && <InlineError text={ errors.password.message } />
            }
          </div>

          <button
            type='submit'
            disabled={ isLoading }
            className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
            {
              // if loading show loading
              isLoading ? (
                "Завантаження..."
              ) : (
                <>
                  <FiLogIn /> Увійти
                </>
              )
            }
          </button>

          <p className='text-center text-border'>
            Не зареєстровані?{ ' ' }
            <Link to='/register' className='text-subMain font-semibold ml-2'>
              Зареєструватися
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default Login