import React, { Component } from "react";
import "./styles.css";
import $ from "jquery";

class DayBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tvalue: ""
    };
  }

  //This won't work
  //DOM won't store thing
  //use db to store or retrieve data

  handleSubmit = evt => {
    console.log(this.state.textarea);
    this.setState({
      tvalue: this.state.textarea
    });
  };

  handleChange = evt => {
    const { name, value, type } = evt.target;
    this.setState({
      [name]: value
    });
  };

  render() {

    //$("#dayBox").fadeIn();
    return (
      <div id="dayBox" className={`${this.props.dayBox} ${this.props.highlightedDate}`}>
        <p className="daytext"><b>{this.props.date}</b></p>
        <textarea name="textarea" type="text" onChange={this.handleChange} />
      </div>
    );
  }
}

export default DayBox;
