import {
  ADD_COMMENT,
  RECEIVE_COMMENTS,
  SUBMIT_VOTE,
  EDIT_COMMENT,
  REMOVE_COMMENT
} from "../actions/comments";

export default function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.payload;

    case ADD_COMMENT:
      return state.concat(action.payload);

    case SUBMIT_VOTE:
      const { id, option } = action.payload;

      const newState = state.map(comment => {
        if (comment.id === id) {
          option === "upVote"
            ? (comment.voteScore = comment.voteScore + 1)
            : (comment.voteScore = comment.voteScore - 1);
        }

        return comment;
      });

      return newState;

    case EDIT_COMMENT:
      const { comment } = action.payload;

      const { title, body } = comment;
      const editedState = state.map(p => {
        if (p.id === action.payload.comment.id) {
          p.title = title;
          p.body = body;
        }
        return p;
      });

      return editedState;
      case REMOVE_COMMENT:
        return state.filter(comment=>comment.id!==action.payload);
    default:
      return state;
  }
}
