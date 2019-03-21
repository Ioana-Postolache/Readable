import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import uniqid from "uniqid";
import { handleAddPost, handleEditPost } from "../actions/posts";
import Dropdown from "react-dropdown";

class NewPost extends Component {
  state = {
    title: "",
    author: "",
    body: "",
    category: "",
    toHome: false
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, author, body, category } = this.state;
    const { dispatch, post } = this.props;

    if (post === undefined) {
      const post = {
        id: uniqid(),
        timestamp: Date.now(),
        title,
        author,
        body,
        category,
        voteScore: 1,
        deleted: false
      };
      return dispatch(handleAddPost("posts", post)).then(() =>
        this.setState({
          title: "",
          author: "",
          body: "",
          category: "",
          toHome: true
        })
      );
    } else {
      const { id } = post;
      const editedPost = { title, body };

      dispatch(handleEditPost("posts",  id, editedPost)).then(() =>
        this.setState({
          title: "",
          author: "",
          body: "",
          category: "",
          toHome: true
        })
      );
    }
  };

  onSelect = event => {

    this.setState({ category: event.target.value });
  };

  handleChange = event => {
    const text = event.target.value;
    const option = event.target.name;
    switch (option) {
      case "title":
        return this.setState({
          title: text
        });
      case "author":
        return this.setState({
          author: text
        });
      case "body":
        return this.setState({
          body: text
        });
      default:
        return undefined;
    }
  };

  componentDidMount() {
    const { post } = this.props;

    if (post !== undefined) {
      const { id, title, body, author, category } = post;
      return this.setState({ title, body, author, category });
    }
  }
  render() {
    const { title, author, body, category, toHome } = this.state;
    const { categories } = this.props;

    if (toHome === true) {
      return <Redirect to="/posts" />;
    }

    return (
      <div className="ui segment">
        <h3 className="ui block header">Create new post</h3>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={this.handleChange}
              className="textarea"
            />
          </div>

          <div className="field">
            <input
              type="text"
              name="body"
              placeholder="body"
              value={body}
              onChange={this.handleChange}
              className="textarea"
            />
          </div>
          <div className="two fields">
            <div className="field">
              <input
                type="text"
                name="author"
                placeholder="author"
                value={author}
                onChange={this.handleChange}
                className="textarea"
              />
            </div>

            <select onChange={this.onSelect} className="ui dropdown">
              <option hidden={true} value="">
                Category
              </option>
              {categories.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button
            className="ui secondary button"
            type="submit"
            disabled={
              title === "" || author === "" || body === "" || category === ""
            }
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProperties({ posts, categories }, props) {
  const { id } = props.match.params;
  const post = id
    ? Object.values(posts).filter(post => post.id === id)[0]
    : undefined;

  const categoriesArray = Object.values(categories).map(c => c.name);

  return {
    categories: categoriesArray,
    post
  };
}
export default connect(mapStateToProperties)(NewPost);
