import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Nav extends Component {
  render() {
    console.log(this.props)
    return (
      <nav className="ui segment">
        <div className="ui menu">
          <button
            className="ui basic button"
            onClick={() => {
              this.props.history.push("/");
              this.props.changeState("all");
            }}
          >
            Home
          </button>
          <button
            className="ui basic button"
            onClick={() => this.props.history.push("/posts/new")}
          >
            New Post
          </button>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
