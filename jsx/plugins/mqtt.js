import React, {Component} from "react";
import querystring from "querystring";

export default class Mqtt extends Component {
  render(){
    return <div>
      <div className="form-group">
        <label>Topic</label>
        <input ref="topic" id="topic" className="form-control" placeholder="Topic"/>
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea ref="message" id="message" className="form-control" placeholder="Message"/>
      </div>
    </div>;
  }
  static parseRef(refs){
    const topic   = refs.topic.value.trim();
    const message = refs.message.value.trim();
    return {
      topic,
      message
    };
  }
};
