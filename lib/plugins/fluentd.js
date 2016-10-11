const Plugin = require("./plugin");
module.exports = class Fluentd extends Plugin {
  execute(){
    return Promise.resolve();
  }
};
