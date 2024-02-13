import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices"
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from 'react-hot-toast'

// login action
const loginAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(datas);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
}

//register action
const registerAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(datas);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL)
  }
}

//logout action
const logoutAction = () => (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT })
  dispatch({ type: userConstants.USER_LOGIN_RESET })
  dispatch({ type: userConstants.USER_REGISTER_RESET })
}

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(user, tokenProtection(getState));
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_SUCCESS, payload: response });
    toast.success("Профіль відредаговано✨");
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

//delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    await userApi.deleteProfileService(tokenProtection(getState));
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
    toast.success("Профіль видалено👀");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};

// change password action
const changePasswordAction = (password) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userApi.changePasswordService(
      password,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};

//get all favorite movies action
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
    const response = await userApi.getFavoriteMovies(tokenProtection(getState));
    dispatch({
      type: userConstants.GET_FAVORITE_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
  }
};

//delete all favorite movies action
const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_REQUEST });
    await userApi.deleteFavoriteMovies(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.DELETE_FAVORITE_MOVIES_SUCCESS,
    })
    toast.success("Збережені фільми видалено")
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_FAVORITE_MOVIES_FAIL);
  }
}

//admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const response = await userApi.getAllUsersService(tokenProtection(getState));
    dispatch({
      type: userConstants.GET_ALL_USERS_SUCCESS,
      payload: response,
    })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

//admin delete user action
const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    await userApi.deleteUserService(id, tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_USER_SUCCESS,
    });
    toast.success("Юзера видалено");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
  }
};

// user like movie action
const likeMovieAction = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
    const response = await userApi.likeMovieService(
      movieId,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.LIKE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Added to your favorites");
    dispatch(getFavoriteMoviesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getFavoriteMoviesAction,
  deleteFavoriteMoviesAction,
  getAllUsersAction,
  deleteUserAction,
  likeMovieAction
};