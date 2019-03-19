import React, { Component } from "react";
import { formatDate } from "../utils/helpers";

class Post extends Component {
  render() {
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
    } = this.props.post;

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
        </div>
      </div>
    );
  }
}

export default Post;
