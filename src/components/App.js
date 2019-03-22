import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import handleInitialData from "../actions/shared";
import DefaultView from "./DefaultView";
import NewPost from "./NewPost";
import NewComment from "./NewComment";
import PostDetail from "./PostDetail";
import PageNotFound from "./PageNotFound";
import Nav from "./Nav";

class App extends Component {
  state = { selectedCategory: "all" };
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  changeState = selectedCategory => {
    this.setState({ selectedCategory });
  };

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
                <Nav changeState={this.changeState}/>
                <Switch>
                  <Route
                    path="/:category"
                    exact
                    render={() => (
                      <DefaultView
                        selectedCategory={this.state.selectedCategory}
                        changeState={this.changeState}
                      />
                    )}
                  />
                  <Route
                    path="/"
                    exact
                    render={() => (
                      <DefaultView
                        selectedCategory={this.state.selectedCategory}
                        changeState={this.changeState}
                      />
                    )}
                  />
                  <Route path="/posts/new" exact component={NewPost} />
                  <Route path="/posts/edit/:id" exact component={NewPost} />
                  <Route path="/posts/:id" exact component={PostDetail} />
                  <Route
                    path="/posts/:id/newComment"
                    exact
                    component={NewComment}
                  />
                  <Route
                    path="/comments/edit/:id"
                    exact
                    component={NewComment}
                  />
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            </div>
          )}
        </Fragment>
      </Router>
    );
  }
}

export default connect()(App);
