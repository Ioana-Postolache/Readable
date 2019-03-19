import { receivePosts } from "./posts";
import { getAll} from '../utils/api'
import { showLoading, hideLoading } from "react-redux-loading";

export default function handleInitialData(){
  return(dispatch)=>{
    dispatch(showLoading())
    return getAll('posts')
     .then(posts=>dispatch(receivePosts(posts)))
     .then(dispatch(hideLoading()))
  }
}
