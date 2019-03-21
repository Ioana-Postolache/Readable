import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import handleInitialData from "../actions/shared";
import Posts from "./Posts";
import NewPost from "./NewPost";
import Categories from "./Categories";
import Nav from "./Nav";

class App extends Component {
  state = { category: "all" };
  onSelect = event => {
    const category = event.target.value;
    this.setState({ category });
    if (category === "all") {
      this.props.history.push(`/`);
      return this.forceUpdate();
    }
    this.props.history.push(`/${category}`);
    return this.forceUpdate();
  };

  componentDidMount() {
    this.props.dispatch(handleInitialData()).then(()=>{
      const {categories} = this.props
      const {pathname} = this.props.location
      const category = pathname.replace('/','')
      return categories.includes(category)? this.setState({category}): this.setState({category: "all"})
    })

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

                <Route
                  path="/:category"
                  exact
                  render={(props) => (
                    <Categories
                    {...props}
                      onSelect={this.onSelect}
                      selectedCategory={this.state.category}
                    />
                  )}
                />

                <Route
                  path="/:category"
                  exact
                  render={()=> (
                    <Posts  category={this.state.category} />
                  )}
                />
                <Route
                  path="/"
                  exact
                  render={() => <Categories onSelect={this.onSelect} />}
                />
                <Route
                  path="/"
                  exact
                  render={() => <Posts category={this.state.category} />}
                />
                <Route path="/new-post" component={NewPost} />
                <Route path="/posts/:id" component={NewPost} />
              </div>
            </div>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ categories }) {
  const categoriesArray = Object.values(categories).map(c => c.name);

  return {
    categories: categoriesArray
  };
}
export default connect(mapStateToProps)(withRouter(App));
