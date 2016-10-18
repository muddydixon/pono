import React, {Component} from "react";

export default class Prop extends Component {
  render(){
    const {prop} = this.props;
    return <tr><td>{prop.key}</td><td>{prop.val}</td><td><button className="btn btn-danger">Delete</button></td></tr>;
  }
};
