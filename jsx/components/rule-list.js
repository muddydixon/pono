import React, {Component} from "react";

import Rule from "./rule";

export default class RuleList extends Component {
  render(){
    const {rules} = this.props.data;

    return <div className="container">
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Endpoint</th><th>Protocol</th><th>Host</th><th>Port</th><th /></tr>
        </thead>
        <tbody>
          {rules.map(rule=> <Rule key={rule.id} rule={rule} />)}
        </tbody>
      </table>
    </div>;
  }
};
