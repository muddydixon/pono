import React, {Component} from "react";
import {Link} from "react-router";
import ConfigStore from "../stores/config-store";
import RuleAction from "../actions/rule-action";

export default class Rule extends Component {
  onDelete(){
    const {rule} = this.props;
    RuleAction.delete(rule);
  }
  onModify(){
  }
  onFlight(){
    const {rule} = this.props;
    RuleAction.flight(rule);
  }
  render(){
    const config = ConfigStore.getState();
    const {rule} = this.props;
    const endpoint = `${config.protocol}//${config.host}:${config.port}${config.proxyPath}/${rule.identifier}`;
    return <tr><td><Link to={`/rules/${rule.name}`}>{rule.name}</Link></td><td><a href={endpoint}>{endpoint}</a></td><td>{rule.protocol}</td><td>{rule.host}</td><td>{rule.port}</td>
      <td>
      <button className="btn btn-danger btn-xs" onClick={this.onDelete.bind(this)}><i className="fa fa-trash-o" /></button>&nbsp;
      <button className="btn btn-info btn-xs" onClick={this.onFlight.bind(this)}><i className="fa fa-paper-plane" /></button>
      </td>
      </tr>;
  }
};
