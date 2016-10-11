const request = require("request");
const Plugin = require("./plugin");

module.exports = class Http extends Plugin {
  execute(){
    console.log(this.rule);
    const protocol = this.rule.protocol;
    const host = this.rule.host;
    const port = this.rule.port;
    const {method, headers, body} = JSON.parse(this.rule.payload);

    Object.keys(headers).forEach((header)=>{
      headers[header] = this.expandPlaceholder(headers[header], this.params, this.query);
    });

    const opts = {
      url: `${protocol}//${host}:${port}`,
      method: method.toLowerCase(),
      headers,
      form: body
    };
    console.log(opts);
    return new Promise((resolve, reject)=>{
      request(opts, (err, res, body)=>{
        console.log({err, body});
        if(err) return reject(err);
        return resolve(body);
      });
    });
  }
};
