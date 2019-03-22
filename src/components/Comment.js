import React, { Component } from "react";
import { formatDate } from "../utils/helpers";

class Comment extends Component {
  state = { option: "" };

  voteComment = event => {
    const option = event.currentTarget.name;

    const { voteComment, comment } = this.props;
    voteComment("comments", comment, option);
    this.setState({ option });
  };

  render() {
    const { option } = this.state;
    const { comment } = this.props;
    const { id, timestamp, body, author, voteScore } = comment;

    return (
      <div className="ui comments" key={id}>
        <div className="comment">
          <div className="content">
            <div className="text">{body}</div>
            <div className="metadata">
              <div className="author">Posted by {author} </div>
              <div className="date">{formatDate(timestamp)}</div>
              <div className="rating">
                <i className="star icon" />
                {voteScore}
              </div>
            </div>
          </div>
          <div className="inline">
            <button
              name="upVote"
              className="ui circular button"
              onClick={e => this.voteComment(e, comment)}
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
              onClick={e => this.voteComment(e, comment)}
              style={
                option === "downVote"
                  ? { backgroundColor: "#FF0000" }
                  : { color: "#101010" }
              }
            >
              <i className="thumbs down  icon" name="downVote" />
            </button>
            <button
              className="ui button"
              onClick={e => this.editComment(e, id)}
            >
              Edit comment
            </button>
            <button className="ui button" onClick={e => this.props.deleteComment(comment)}>
              Delete comment
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
