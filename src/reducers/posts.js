import { ADD_POST, RECEIVE_POSTS, SUBMIT_VOTE } from "../actions/posts";

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

    default:
      return state;
  }
}
