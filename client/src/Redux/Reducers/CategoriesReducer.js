import * as CategoriesConstants from '../Constants/CategoriesConstants'

// GET ALL CATEGORIES
export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CategoriesConstants.GET_ALL_CATEGORIES_REQUEST:
      return {
        isLoading: true,
      }
    case CategoriesConstants.GET_ALL_CATEGORIES_SUCCESS:
      return {
        isLoading: false, categories: action.payload
      }
    case CategoriesConstants.GET_ALL_CATEGORIES_FAIL:
      return {
        isLoading: false, isError: action.payload
      }
    default:
      return state
  }
}

// CREATE CATEGORIES
export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoriesConstants.CREATE_CATEGORIES_REQUEST:
      return { isLoading: true };
    case CategoriesConstants.CREATE_CATEGORIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoriesConstants.CREATE_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoriesConstants.CREATE_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
}

// UPDATE CATEGORIES
export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoriesConstants.UPDATE_CATEGORIES_REQUEST:
      return { isLoading: true };
    case CategoriesConstants.UPDATE_CATEGORIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoriesConstants.UPDATE_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoriesConstants.UPDATE_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
}

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoriesConstants.DELETE_CATEGORIES_REQUEST:
      return { isLoading: true };
    case CategoriesConstants.DELETE_CATEGORIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoriesConstants.DELETE_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoriesConstants.DELETE_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
}