import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Post from "./Post";
import Comment from "./Comment";
import { getDetails, postVote, deleteData } from "../utils/api";

class PostDetail extends Component {
  state = { comments: undefined };

  componentDidMount() {
    const { id } = this.props.match.params;

    getDetails("posts", id, "comments").then(comments =>
      this.setState({ comments })
    );
  }

  editComment = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/comments/edit/${id}`);
  };

  deleteComment = comment => {
    const { id, parentId } = comment;
    deleteData("comments", id)
      .then(() => getDetails("posts", parentId, "comments"))
      .then(comments => this.setState({ comments }));
  };

  voteComment = (event, comment, option) => {
    const { id, parentId } = comment;
    postVote("comments", id, { option })
      .then(() => getDetails("posts", parentId, "comments"))
      .then(comments => this.setState({ comments }));
  };

  render() {
    const { id } = this.props.match.params;
    const { comments } = this.state;

    if (id) {
      return (
        <div className="ui segment">
          <div className="ui  divided items">
            <Post postId={id} />
            {comments && (
              <div className="ui  divided items">
                <h4 className="ui horizontal divider header">
                  <i className="comment alternate icon" />
                  Comments
                </h4>
                <Link
                  className="ui secondary button"
                  to={`/posts/${id}/newComment`}
                >
                  New comment
                </Link>
                {comments.map(comment => {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      deleteComment={this.deleteComment}
                      vote={this.voteComment}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  }
}

export default connect()(PostDetail);
