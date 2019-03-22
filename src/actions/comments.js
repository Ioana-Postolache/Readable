import { postData, putData, deleteData, getAll, postVote } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const ADD_COMMENT = "SAVE_COMMENT";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const SUBMIT_VOTE = "SUBMIT_VOTE";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    payload: comments
  };
}

function addComment(comment) {
  return {
    type: ADD_COMMENT,
    payload: comment
  };
}

function addVote({ id, option }) {
  return {
    type: SUBMIT_VOTE,
    payload: { id, option }
  };
}

function editComment(comment, id) {
  return {
    type: EDIT_COMMENT,
    payload: {comment, id}
  };
}

function removeComment(id) {
  return {
    type: REMOVE_COMMENT,
    payload: id
  };
}

export function handleReceiveComments() {
  return dispatch => {
    dispatch(showLoading());
    return getAll("comments")
      .then(comments => dispatch(receiveComments(comments)))
      .then(dispatch(hideLoading()));
  };
}

export function handleAddComment(schema, comment) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return postData(schema, comment)
      .then(comment => dispatch(addComment(comment)))
      .then(dispatch(hideLoading()));
  };
}

export function handleVoteComment(schema, { id, option }) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return postVote(schema, id, { option })
      .then(() => dispatch(addVote({ id, option })))
      .then(dispatch(hideLoading()));
  };
}

export function handleEditComment(schema, id, editedComment ) {
  const comment = editedComment;
  return (dispatch, getState) => {
    dispatch(showLoading());
    return putData(schema, id, comment)
      .then((id, comment) => dispatch(editComment(id, comment)))
      .then(dispatch(hideLoading()));
  };
}

export function handleDeleteComment(schema, id) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return deleteData(schema, id)
      .then(()=> dispatch(removeComment(id)))
      .then(dispatch(hideLoading()));
  };
}
