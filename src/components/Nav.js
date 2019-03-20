import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <nav className="ui segment">
        <div className="ui menu">
          <NavLink className="item" to="/" exact>
            Home
          </NavLink>
          <NavLink className="item" to="/posts">
            Posts
          </NavLink>
          <NavLink className="item" to="/new-post">
            New Post
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default Nav;
