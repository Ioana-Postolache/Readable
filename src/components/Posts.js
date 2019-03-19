import React, { Component } from "react";
import { getAll } from "../utils/api";
import { connect } from "react-redux";
import Post from "./Post";

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
            {posts && posts.map(p => <Post key={p.id} post={p} />)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProperties({ posts }) {
  let postsArray = [];

  postsArray = Object.values(posts).map(p => {
    return {
      ...p
    };
  });

  return {
    posts: postsArray
  };
}
export default connect(mapStateToProperties)(Posts);
