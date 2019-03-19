import {postData, getAll} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'


export const ADD_POST = 'SAVE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SUBMIT_VOTE = 'SUBMIT_VOTE'

export function receivePosts(posts){
  return{
    type: RECEIVE_POSTS,
    payload: posts
  }
}

function addPost(post){
  return{
    type: ADD_POST,
    payload:post
  }
}

export function handleReceivePosts(){
  return(dispatch)=>{
    dispatch(showLoading())
    return getAll('posts')
     .then(posts=>dispatch(receivePosts(posts)))
     .then(dispatch(hideLoading()))
  }
}