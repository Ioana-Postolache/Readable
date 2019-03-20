import { postData, getAll, postVote } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const ADD_POST = "SAVE_POST";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SUBMIT_VOTE = "SUBMIT_VOTE";

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
    const { authedUser } = getState();
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
      .then(post => dispatch(addVote({ id, option })))
      .then(dispatch(hideLoading()));
  };
}
