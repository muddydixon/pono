const request = require("request");
const Plugin = require("./plugin");

module.exports = class Http extends Plugin {
  execute(query){
    const protocol = this.rule.protocol;
    const host = this.rule.host;
    const port = this.rule.port;
    const {method, headers, body, path} = JSON.parse(this.rule.payload);
    const props = {};
    this.rule.props.forEach(prop => props[prop.key] = prop.val);
    Object.keys(headers).forEach((header)=>{
      headers[header] = this.expandPlaceholder(headers[header], props, query);
    });
    Object.keys(body).forEach((key)=>{
      body[key] = this.expandPlaceholder(body[key], props, query);
    });

    const opts = {
      url: `${protocol}//${host}:${port}${path}`,
      method: method.toLowerCase(),
      headers,
      formData: body
    };

    console.log(opts);
    return new Promise((resolve, reject)=>{
      request(opts, (err, res, body)=>{
        if(err) return reject(err);
        return resolve(body);
      });
    });
  }
};
