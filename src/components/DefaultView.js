import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Posts from "./Posts";
import Categories from "./Categories";

class DefaultView extends Component {
  onSelect = event => {
    const category = event.target.value;
    this.props.changeState(category);

    if (category === "all") {
      this.props.history.push(`/`);
    }
    this.props.history.push(`/${category}`);
  };

  render() {
    const { selectedCategory } = this.props;

    return (
      <div>
        <Categories
          {...this.props}
          onSelect={this.onSelect}
          selectedCategory={selectedCategory}
        />
        <Posts category={selectedCategory} />
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  const categoriesArray = Object.values(categories).map(c => c.name);

  return {
    categories: categoriesArray
  };
}
export default withRouter(connect(mapStateToProps)(DefaultView));
