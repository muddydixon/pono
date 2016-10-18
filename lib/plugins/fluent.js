const Plugin = require("./plugin");
const fluent = require("fluent-logger");

module.exports = class Fluent extends Plugin {
  execute(query){
    const protocol = this.rule.protocol;
    const host = this.rule.host;
    const port = this.rule.port;
    const {tag, message} = JSON.parse(this.rule.payload);

    const logger = fluent.createFluentSender("", {
      host,
      port
    });
    const props = {};
    this.rule.props.forEach(prop => props[prop.key] = prop.val);

    Object.keys(message).forEach((key)=>{
      message[key] = this.expandPlaceholder(message[key], props, query);
    });
    return new Promise((resolve, reject)=>{
      logger.emit(tag, message, (err)=>{
        if(err) return reject(err);
        return resolve({tag, message: message});
      });
    });
  }
};
