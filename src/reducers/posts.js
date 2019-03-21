import {
  ADD_POST,
  RECEIVE_POSTS,
  SUBMIT_VOTE,
  EDIT_POST,
  REMOVE_POST
} from "../actions/posts";

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.payload;

    case ADD_POST:
      return state.concat(action.payload);

    case SUBMIT_VOTE:
      const { id, option } = action.payload;

      const newState = state.map(post => {
        if (post.id === id) {
          option === "upVote"
            ? (post.voteScore = post.voteScore + 1)
            : (post.voteScore = post.voteScore - 1);
        }

        return post;
      });

      return newState;

    case EDIT_POST:
      const { post } = action.payload;

      const { title, body } = post;
      const editedState = state.map(p => {
        if (p.id === action.payload.post.id) {
          p.title = title;
          p.body = body;
        }
        return p;
      });

      return editedState;
      case REMOVE_POST:
        return state.filter(post=>post.id!==action.payload);
    default:
      return state;
  }
}
