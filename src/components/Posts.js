import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

        <div className="ui segment">
          <div className="ui two column very relaxed grid">
            <div className="column">
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
            <div className="column">
              <Link className="ui secondary button" to="/new-post">
                Create new post
              </Link>
            </div>
          </div>
        </div>
        <div className="ui  segment">
          <div className="ui  divided items">
            {posts && sorted_posts.map(p => <Post key={p.id} postId={p.id} />)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProperties({ posts }, { category }) {
  let postsArray = [];

  postsArray = Object.values(posts)
    .filter(p => (category === "all" ? p : p.category === category))
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
