import React, { Component } from "react";
import { getAll } from "../utils/api";
import { connect } from "react-redux";
import Post from "./Post";

class Categories extends Component {
  render() {
    const { posts, categories } = this.props;
    console.log("posts................", JSON.stringify(posts));
    console.log("categories................", JSON.stringify(categories));
    return (
      <div className="ui segment">
        <h3 className="ui block header"> Categories Lists </h3>
        <div className="ui segment">
          <div className="ui bulleted list">
            {categories &&
              categories.map(c => (
                <div className="item" key={c.name}>
                  {c.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProperties({ categories, posts }) {
  let categoriesArray = [];
  let postsArray = [];
  console.log(JSON.stringify(categories));
  console.log(JSON.stringify(posts));
  categoriesArray = Object.values(categories).map(c => {
    return {
      ...c
    };
  });
  postsArray = Object.values(posts).map(p => {
    return {
      ...p
    };
  });

  return {
    posts: postsArray,
    categories: categoriesArray
  };
}
export default connect(mapStateToProperties)(Categories);
