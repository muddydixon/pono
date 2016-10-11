import React, {Component} from "react";
import {Link} from "react-router";
import ConfigStore from "../stores/config-store";

export default class Rule extends Component {
  render(){
    const config = ConfigStore.getState();
    const {rule} = this.props;
    const endpoint = `${config.protocol}//${config.host}:${config.port}${config.proxyPath}/${rule.identifier}`;
    return <tr><td><Link to={`/rules/${rule.name}`}>{rule.name}</Link></td><td><a href={endpoint}>{endpoint}</a></td><td>{rule.protocol}</td><td>{rule.host}</td><td>{rule.port}</td></tr>;
  }
};
