import React, { Component } from "react";
import { getAll } from "../utils/api";
import { connect } from "react-redux";

class Categories extends Component {
  render() {
    const { categories } = this.props;

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

function mapStateToProperties({ categories }) {
  let categoriesArray = [];

  categoriesArray = Object.values(categories).map(c => {
    return {
      ...c
    };
  });

  return {
    categories: categoriesArray
  };
}
export default connect(mapStateToProperties)(Categories);
