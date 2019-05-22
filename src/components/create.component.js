// create.component.js

import React, { Component } from "react";
import { Editor, EditorState } from "draft-js";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeCardName = this.onChangeCardName.bind(this);
    this.onChangeCardContent = this.onChangeCardContent.bind(this);
    this.onChangeCardTag = this.onChangeCardTag.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      card_name: "",
      card_content: { editorState: EditorState.createEmpty() },
      card_tag: ""
    };
  }
  onChangeCardName(e) {
    this.setState({
      card_name: e.target.value
    });
  }
  onChangeCardContent(editorState) {
    this.setState({
      editorState
    });
  }
  onChangeCardTag(e) {
    this.setState({
      card_tag: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      card_name: this.state.card_name,
      card_content: this.state.card_content,
      card_tag: this.state.card_tag
    };
    axios
      .post("http://localhost:4000/card/add", obj)
      .then(res => console.log(res.data));

    this.setState({
      card_name: "",
      card_content: "",
      card_tag: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Add New Card</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Card: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.card_name}
              onChange={this.onChangeCardName}
            />
          </div>
          <div className="form-group">
            <label>Card Content: </label>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChangeCardContent}
            />
            {/* <input
              type="text"
              className="form-control"
              value={this.state.card_content}
              onChange={this.onChangeCardContent}
            />  */}
          </div>
          <div className="form-group">
            <label>Card Tag: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.card_tag}
              onChange={this.onChangeCardTag}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Register Card"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
