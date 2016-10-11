import React, {Component} from "react";
import Http from "../plugins/http";
import Mqtt from "../plugins/mqtt";
import Fluent from "../plugins/fluent";

export default class TokenDetail extends Component {
  render(){
    const {rules} = this.props.data;
    const rule = rules.find(r => r.name === this.props.params.name);
    if(!rule) return null;
    const protocol = (()=>{
      const p = rule.protocol.slice(0, rule.protocol.length - 1);
      return p[0].toUpperCase() + p.slice(1);
    })();

    return <div className="container">
      <table className="table">
      <thead>
        <tr><th>Attr</th><th>Value</th></tr>
      </thead>
      </table>
    </div>;
  }
};
