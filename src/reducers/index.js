import {combineReducers} from 'redux'
import posts from './posts'
import {loadingBarReducer} from 'react-redux-loading'

export default combineReducers({
  posts,
  loadingBar: loadingBarReducer
})
