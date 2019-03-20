import React, { Component } from "react";
import { getAll } from "../utils/api";
import { connect } from "react-redux";
import Post from "./Post";
import SortButton from "./SortButton";

class Posts extends Component {
  state = { sorted: "sortByTimestamp", sortDirection: "desc" };

  sort = event => {
    const sorted = event.target.name;
    this.setState(prevState => {
      return {
        sorted,
        sortDirection:
          prevState.sorted === sorted
            ? prevState.sortDirection === "desc"
              ? "asc"
              : "desc"
            : prevState.sortDirection
      };
    });
  };

  createPost = () => {};

  render() {
    const { posts } = this.props;
    const { sorted, sortDirection } = this.state;
    const sorted_posts =
      posts && sorted === "sortByTimestamp"
        ? sortDirection === "desc"
          ? posts.sort((a, b) => {
              return -a.timestamp - b.timestamp;
            })
          : posts.sort((a, b) => {
              return a.timestamp - b.timestamp;
            })
        : sortDirection === "desc"
        ? posts.sort((a, b) => {
            return -a.voteScore - b.voteScore;
          })
        : posts.sort((a, b) => {
            return a.voteScore - b.voteScore;
          });

    return (
      <div className="ui segment">
        <h3 className="ui block header"> Posts Lists </h3>
        <div className="inline">
          <SortButton
            sorted={sorted}
            check={"sortByVote"}
            name={"sortByVote"}
            onClick={this.sort}
          />
          <SortButton
            sorted={sorted}
            check={"sortByTimestamp"}
            name={"sortByTimestamp"}
            onClick={this.sort}
          />

          <i
            className={
              sortDirection === "asc"
                ? "arrow alternate circle up icon"
                : "arrow alternate circle down icon"
            }
          />
        </div>
        <div className="ui  segment">
          <div className="ui  divided items">
            {posts &&
              sorted_posts.map(p => (
                <Post key={p.id} postId={p.id}/>
              ))}
          </div>
        </div>
        <button className="ui secondary button" onClick={this.createPost}>
          Create new post
        </button>
      </div>
    );
  }
}

function mapStateToProperties({ posts }) {
  let postsArray = [];

  postsArray = Object.values(posts)
    .map(p => {
      return {
        ...p
      };
    })
    .sort((a, b) => {
      return -a.timestamp - b.timestamp;
    });

  return {
    posts: postsArray
  };
}
export default connect(mapStateToProperties)(Posts);
