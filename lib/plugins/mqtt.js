const Plugin = require("./plugin");
const mqtt = require("mqtt");
module.exports = class Mqtt extends Plugin {
  execute(query){
    const protocol = this.rule.protocol;
    const host = this.rule.host;
    const port = this.rule.port;
    const {username, password, topic, message} = JSON.parse(this.rule.payload);

    const conn = mqtt.connect({
      protocol: "mqtt",
      host,
      port,
      username,
      password
    });
    const props = {};
    this.rule.props.forEach(prop => props[prop.key] = prop.val);
    const expandedMessage = this.expandPlaceholder(message, props, query);

    return new Promise((resolve, reject)=>{
      conn.on("connect", ()=>{
        return conn.publish(topic, expandedMessage, (err)=>{
          if(err) reject(err);
          conn.end();
          return resolve({topic, expandedMessage});
        });
      });
      conn.on("error", (err)=>{
        conn.end();
        reject(err);
      });
    });
  }
};
