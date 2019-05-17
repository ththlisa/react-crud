import React, { Component } from "react";
import axios from "axios";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeCardName = this.onChangeCardName.bind(this);
    this.onChangeCardContent = this.onChangeCardContent.bind(this);
    this.onChangeCardTag = this.onChangeCardTag.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      card_name: "",
      card_content: "",
      card_tag: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/card/edit/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          card_name: response.data.card_name,
          card_content: response.data.card_content,
          card_tag: response.data.card_tag
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeCardName(e) {
    this.setState({
      card_name: e.target.value
    });
  }
  onChangeCardContent(e) {
    this.setState({
      card_content: e.target.value
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
      .post(
        "http://localhost:4000/card/update/" + this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));
    this.setState({
      card_name: "",
      card_content: "",
      card_tag: ""
    });

    this.props.history.push("/index");
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Update Card</h3>
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
            <input
              type="text"
              className="form-control"
              value={this.state.card_content}
              onChange={this.onChangeCardContent}
            />
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
              value="Update Card"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
