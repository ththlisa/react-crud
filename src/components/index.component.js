import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { card: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/card")
      .then(response => {
        this.setState({ card: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  TableRow() {
    return this.state.card.map(function(object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">card List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>name</th>
              <th>content</th>
              <th>tag</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.TableRow()}</tbody>
        </table>
      </div>
    );
  }
}
