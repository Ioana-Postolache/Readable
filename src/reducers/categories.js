import { ADD_CATEGORY, RECEIVE_CATEGORIES } from '../actions/categories'

export default function categories (state={}, action){
  switch(action.type){
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        ...action.payload
      }
    case ADD_CATEGORY:
      return {
        ...state,
        [action.payload.id]: {...action.payload}
      }

    default:
      return state
  }
}
