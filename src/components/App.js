import React, { Component } from "react";
import { connect } from "react-redux";
import handleInitialData from "../actions/shared";
import Posts from "./Posts";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return <Posts />;
  }
}

function mapStateToProps({ posts }) {
  return {
    loading: Object.keys(posts).length === 0
  };
}
export default connect(mapStateToProps)(App);
