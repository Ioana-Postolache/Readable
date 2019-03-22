import { getAll} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'


export const ADD_CATEGORY = 'SAVE_CATEGORY'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIESS'


export function receiveCategories(categories){
  return{
    type: RECEIVE_CATEGORIES,
    payload: categories
  }
}

export function handleReceiveCategories(){
  return(dispatch)=>{
    dispatch(showLoading())
    return getAll('categories')
     .then(categories=>dispatch(receiveCategories(categories)))
     .then(dispatch(hideLoading()))
  }
}
