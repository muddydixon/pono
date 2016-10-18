import React, {Component} from "react";
import {Link} from "react-router";

export default class Token extends Component {
  render(){
    const {token} = this.props;
    return <tr>
      <td>{token.name}</td><td>{token.token}</td><td><Link to={`/rules/${token.rule.name}`}>{token.rule.name}</Link></td><td>{token.whitelist}</td>
      <td>
      <button className="btn btn-success btn-xs"><i className="fa fa-edit" /></button>&nbsp;
      <button className="btn btn-danger btn-xs"><i className="fa fa-trash-o" /></button>
      </td>
      </tr>;
  }
};
