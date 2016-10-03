import React, {Component} from "react";
import Const from "../constants";

import Http from "../plugins/http";
import Mqtt from "../plugins/mqtt";
import Fluent from "../plugins/fluent";
const Plugins = {
  Http, Mqtt, Fluent
};

import RuleAction from "../actions/rule-action";

export default class RuleCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      protocol: "http:"
    };
  }
  getPayloadForm(){
    // このあたりも plugin システムにしたい
    // placeholder を使いたい `${tag}` って書くと、 query の tag を取ってくるとか
    const {protocol} = this.state;
    switch(protocol){
    case "http:":
    case "https:":
      return <Http ref="plugin"/>;
    case "mqtt:":
    case "mqtts:":
    case "ws:":
    case "wss:":
      return <Mqtt ref="plugin"/>;
    case "fluent:":
      return <Fluent ref="plugin"/>;
    default:
      return <div>None</div>;
    }
  }
  onSubmit(ev){
    ev.preventDefault();
    const name      = this.refs.rulename.value.trim();
    const protocol  = this.refs.protocol.value.trim();
    const host      = this.refs.host.value.trim();
    const port      = +(this.refs.port.value.trim());
    const plugin = Plugins[this.refs.plugin.constructor.name];
    const data = {
      name, protocol, host, port,
      payload: JSON.stringify(plugin.parseRef(this.refs.plugin.refs))
    };
    RuleAction.create(data);
  }
  render(){
    return <div className="container">
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <label>Rule Name</label>
          <input type="text" ref="rulename" id="rulename" className="form-control" placeholder="Rule name"/>
        </div>
        <div className="form-group">
          <label>Protocol</label>
          <select className="form-control" ref="protocol" defaultValue={this.state.protocol} onChange={()=>{this.setState({protocol: this.refs.protocol.value.trim()});}}>
            {Const.PROTOCOLS.map(protocol => <option key={protocol} value={protocol}>{protocol}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Host</label>
          <input type="text" ref="host" id="host" className="form-control" placeholder="Host" />
        </div>
        <div className="form-group">
          <label>Port</label>
          <input type="text" ref="port" id="port" className="form-control" placeholder="Port" />
        </div>
        {this.getPayloadForm()}
        <button type="submit" className="btn btn-info">Singup</button>
      </form>
      </div>;
  }
};
