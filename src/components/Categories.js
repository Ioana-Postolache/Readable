import React, { Component } from "react";
import { connect } from "react-redux";

class Categories extends Component {
  render() {
    const { categories, onSelect, selectedCategory } = this.props;

    return (
      <div className="ui segment">
        <div className="ui horizontal massive label">Categories Lists</div>
        <select
          className="ui dropdown"
          onChange={onSelect}
          value={selectedCategory}
        >
          <option value="all">All</option>
          {categories.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

function mapStateToProperties({ categories }) {
  const categoriesArray = Object.values(categories).map(c => c.name);

  return {
    categories: categoriesArray
  };
}
export default connect(mapStateToProperties)(Categories);
