import React, {Component} from "react";
import {Link} from "react-router";

export default class Token extends Component {
  render(){
    const {token} = this.props;
    return <tr><td>{token.name}</td><td>{token.token}</td><td><Link to={`/rules/${token.rule.name}`}>{token.rule.name}</Link></td><td>{token.whitelist}</td></tr>;
  }
};
