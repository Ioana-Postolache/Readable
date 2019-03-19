import { ADD_POST, RECEIVE_POSTS, SUBMIT_VOTE } from '../actions/posts'

export default function posts (state={}, action){
  switch(action.type){
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.payload
      }
    case ADD_POST:
      return {
        ...state,
        [action.payload.id]: {...action.payload}
      }
    case SUBMIT_VOTE:
      const {qid, authedUser, vote} = action.payload

      if(vote === 'optionOne') {
        console.log('SUBMIT_VOTE has been called with ',qid, authedUser, vote)
        return {
          ...state,
          [qid]:{
                  ...state[qid],
                  optionOne: {
                              ...state[qid].optionOne,
                              votes: state[qid].optionOne.votes.concat(authedUser)
                             }
                 }
         }

     }
     return {
        ...state,
        [qid]:{
                ...state[qid],
                optionTwo: {
                            ...state[qid].optionTwo,
                            votes: state[qid].optionTwo.votes.concat(authedUser)
                           }
               }
       }

    default:
      return state
  }
}
