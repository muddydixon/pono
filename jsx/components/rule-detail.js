import React, {Component} from "react";
import PropList from "./prop-list";
import Http from "../plugins/http";
import Mqtt from "../plugins/mqtt";
import Fluent from "../plugins/fluent";
const Plugins = {
  Http, Https: Http, Mqtt, Mqtts: Mqtt, Ws: Mqtt, Wss: Mqtt, Fluent
};

export default class RuleDetail extends Component {
  render(){
    const {rules} = this.props.data;
    const rule = rules.find(r => r.name === this.props.params.name);
    if(!rule) return null;
    const protocol = (()=>{
      const p = rule.protocol.slice(0, rule.protocol.length - 1);
      return p[0].toUpperCase() + p.slice(1);
    })();
    const Plugin = Plugins[protocol];

    rule.payload = rule.payload ? JSON.parse(rule.payload) : {};

    return <div className="container">
      <table className="table">
      <thead>
        <tr><th>Attr</th><th>Value</th></tr>
      </thead>
      <Plugin.Detail rule={rule}/>
      </table>
      <PropList props={rule.props} ruleName={rule.name}/>
    </div>;
  }
};
