import React, { Component } from "react";
import { getAll } from "../utils/api";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";

class Posts extends Component {
  render() {
    getAll("categories").then(data =>
      console.log("categories............", JSON.stringify(data))
    );
    const { posts } = this.props;
    console.log("posts................", JSON.stringify(posts));
    return (
      <div className="ui segment">
        <h3 className="ui block header"> Posts Lists </h3>
        <div className="ui segment">
          <div className="ui items">
            {posts &&
              posts.map(post => {
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
                  <div key={id} className="item">
                    <div className="content">
                      <div className="header">{title}</div>
                      <div className="extra">
                        Posted by {author} in {category} on{" "}
                        {formatDate(timestamp)}
                      </div>
                      <div className="description">{body}</div>
                      <div className="extra">
                        {commentCount} comments | Vote score: {voteScore}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProperties({ posts }) {
  let sortedPosts = [];

  sortedPosts = Object.values(posts).map(post => {
    return {
      ...post
    };
  });

  return {
    posts: sortedPosts
  };
}
export default connect(mapStateToProperties)(Posts);
