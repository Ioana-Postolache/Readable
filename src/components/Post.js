import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { handleVotePost, handleDeletePost } from "../actions/posts";

class Post extends Component {
  state = {
    option: ""
  };

  editPost = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/posts/${id}`);
  };

  deletePost = id => {
    this.props.dispatch(handleDeletePost('posts', id));
  };

  vote = event => {
    event.preventDefault();
    const option = event.currentTarget.name;
    const { handleVote, post, dispatch } = this.props;

    dispatch(handleVotePost("posts", { id: post.id, option })).then(() =>
      this.setState({ option })
    );
  };

  render() {
    const { option } = this.state;
    const { post } = this.props;

    if (post) {
      const {
        id,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted,
        commentCount
      } = post;

      return (
        <div className="item">
          <div className="content">
            <div className="header">{title}</div>
            <div className="extra">
              Posted by {author} in {category} on {formatDate(timestamp)}
            </div>
            <div className="description">{body}</div>
            <div className="extra">
              {commentCount} comments | Vote score: {voteScore}
            </div>

            <div className="inline">
              <button
                name="upVote"
                className="ui circular button"
                onClick={this.vote}
                style={
                  option === "upVote"
                    ? { backgroundColor: "#009933" }
                    : { color: "#101010" }
                }
              >
                <i name="upVote" className="thumbs up  icon" />
              </button>
              <button
                name="downVote"
                className="ui circular button"
                onClick={this.vote}
                style={
                  option === "downVote"
                    ? { backgroundColor: "#FF0000" }
                    : { color: "#101010" }
                }
              >
                <i className="thumbs down  icon" name="downVote" />
              </button>
              <button className="ui button" onClick={e => this.editPost(e, id)}>
                Edit post
              </button>
              <button
                className="ui button"
                onClick={e => this.deletePost(id)}
              >
                Delete post
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps({ posts }, props) {
  const { postId } = props;

  return { post: Object.values(posts).filter(post => post.id === postId)[0] };
}

//needed for history to work
export default withRouter(connect(mapStateToProps)(Post));
