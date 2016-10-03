import React, {Component} from "react";
import querystring from "querystring";

export default class Fluent extends Component {
  render(){
    return <div>
      <div className="form-group">
        <label>Tag</label>
        <input ref="tag" id="tag" className="form-control" placeholder="Tag"/>
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea ref="message" id="message" className="form-control" placeholder="Message"/>
      </div>
    </div>;
  }
  static parseRef(refs){
    const tag   = refs.tag.value.trim();
    const message = querystring.parse(refs.message.value.trim().split("\n").join("&"));
    return {
      tag,
      message
    };
  }
};
