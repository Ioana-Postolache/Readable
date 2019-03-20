import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import handleInitialData from "../actions/shared";
import Posts from "./Posts";
import NewPost from "./NewPost";
import Categories from "./Categories";
import Nav from "./Nav";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { loading } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {loading ? null : (
            <div className="ui container">
              <h1 className="ui block header"> Readable App</h1>
              <div>
                <Nav />
                <Route path="/" exact component={Categories} />
                <Route path="/posts" component={Posts} />
                <Route path="/new-post" component={NewPost} />
              </div>
            </div>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    loading: Object.keys(posts).length === 0
  };
}
export default connect(mapStateToProps)(App);
