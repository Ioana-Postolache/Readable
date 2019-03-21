import { postData, putData, deleteData, getAll, postVote } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const ADD_POST = "SAVE_POST";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SUBMIT_VOTE = "SUBMIT_VOTE";
export const EDIT_POST = "EDIT_POST";
export const REMOVE_POST = "REMOVE_POST";

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    payload: posts
  };
}

function addPost(post) {
  return {
    type: ADD_POST,
    payload: post
  };
}

function addVote({ id, option }) {
  return {
    type: SUBMIT_VOTE,
    payload: { id, option }
  };
}

function editPost(post, id) {
  return {
    type: EDIT_POST,
    payload: {post, id}
  };
}

function removePost(id) {
    console.log('From removePost...................', id)
  return {
    type: REMOVE_POST,
    payload: id
  };
}

export function handleReceivePosts() {
  return dispatch => {
    dispatch(showLoading());
    return getAll("posts")
      .then(posts => dispatch(receivePosts(posts)))
      .then(dispatch(hideLoading()));
  };
}

export function handleAddPost(schema, post) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return postData(schema, post)
      .then(post => dispatch(addPost(post)))
      .then(dispatch(hideLoading()));
  };
}

export function handleVotePost(schema, { id, option }) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return postVote(schema, id, { option })
      .then(() => dispatch(addVote({ id, option })))
      .then(dispatch(hideLoading()));
  };
}

export function handleEditPost(schema, id, editedPost ) {
  const post = editedPost;
  return (dispatch, getState) => {
    dispatch(showLoading());
    return putData(schema, id, post)
      .then((id, post) => dispatch(editPost(id, post)))
      .then(dispatch(hideLoading()));
  };
}

export function handleDeletePost(schema, id) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return deleteData(schema, id)
      .then(()=> dispatch(removePost(id)))
      .then(dispatch(hideLoading()));
  };
}
