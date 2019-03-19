import React, { Component } from "react";
import { formatDate } from "../utils/helpers";

class Post extends Component {
  state = {
    voted: ""
  };

  vote = event => {
    const voted = event.currentTarget.name;
    console.log("You voted...", voted);
    this.setState({ voted });
  };

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
    const { voted } = this.state;

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
              name="up"
              className="ui circular button"
              onClick={this.vote}
              style={
                voted === "up"
                  ? { backgroundColor: "#009933" }
                  : { color: "#101010" }
              }
            >
              <i name="up" className="thumbs up  icon" />
            </button>
            <button
              name="down"
              className="ui circular button"
              onClick={this.vote}
              style={
                voted === "down"
                  ? { backgroundColor: "#FF0000" }
                  : { color: "#101010" }
              }
            >
              <i className="thumbs down  icon" name="down" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
