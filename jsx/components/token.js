import React, {Component} from "react";
import {Link} from "react-router";
import TokenAction from "../actions/token-action";

export default class Token extends Component {
  onDelete(){
    const {token} = this.props;
    TokenAction.delete(token);
  }
  onModify(){
  }
  render(){
    const {token} = this.props;
    return <tr>
      <td>{token.name}</td><td>{token.token}</td><td><Link to={`/rules/${token.rule.name}`}>{token.rule.name}</Link></td><td>{token.whitelist}</td>
      <td>
      <button className="btn btn-success btn-xs"><i className="fa fa-edit" /></button>&nbsp;
      <button className="btn btn-danger btn-xs" onClick={this.onDelete.bind(this)}><i className="fa fa-trash-o" /></button>
      </td>
      </tr>;
  }
};
