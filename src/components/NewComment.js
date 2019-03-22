import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import uniqid from "uniqid";
import { postData, putData, getData } from "../utils/api";

class NewComment extends Component {
  state = {
    commentType: "",
    id: "",
    parentId: "",
    body: "",
    author: "",
    toPost: false
  };

  handleSubmit = event => {
    event.preventDefault();

    const { commentType, id, timestamp, body, author, parentId } = this.state;

    if (commentType === "new") {
      const comment = {
        id: uniqid(),
        timestamp: Date.now(),
        parentId,
        body,
        author,
        voteScore: 1,
        deleted: false,
        deletedParent: false
      };

      return postData("comments", comment).then(() =>
        this.setState({
          timestamp,
          body,
          author,
          parentId,
          toPost: true
        })
      );
    } else {
      const editedComment = { body };

      putData("comments", id, editedComment).then(() =>
        this.setState({
          id: "",
          parentId: "",
          body: "",
          author: "",
          commentType: "",
          toPost: true
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
    const { id } = this.props.match.params;
    if (this.props.match.path === "/posts/:id/newComment") {
      return this.setState({ parentId: id, commentType: "new" });
    }
    getData("comments", id).then(comment => {
      const { parentId, timestamp, body, author, voteScore } = comment;
      return this.setState({
        id,
        parentId,
        timestamp,
        body,
        author,
        voteScore,
        commentType: "old"
      });
    });
  }

  render() {
    console.log(this.props);
    console.log(this.state);

    const { body, author, parentId, toPost } = this.state;

    if (toPost === true) {
      return <Redirect to={`/posts/${parentId}`} />;
    }

    return (
      <div className="ui segment">
        <h3 className="ui block header">Create new comment</h3>
        <form className="ui form" onSubmit={this.handleSubmit}>
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
          </div>
          <button
            className="ui secondary button"
            type="submit"
            disabled={author === "" || body === ""}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewComment);