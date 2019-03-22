import { receivePosts } from "./posts";
import { receiveComments } from "./comments";
import { receiveCategories } from "./categories";
import { getInitialData } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export default function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ categories, posts, comments }) => {
      dispatch(receivePosts(posts));
      dispatch(receiveComments(comments));
      dispatch(receiveCategories(categories));
      dispatch(hideLoading());
    });
  };
}
