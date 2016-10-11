module.exports = class Plugin {
  constructor(rule, params = {}, query = {}){
    if(!rule) throw new Error("rule required");
    this.rule = rule;
    this.params = params;
    this.query = query;
  }
  expandPlaceholder(val, params, query){
    return val.replace(/\$\{[^\}]+\}/g, (m)=>{
      return m.replace(/\$\{([^\}]+)\}/, (m0, m1)=>{
        return (m1.indexOf("query") === 0) ? query[m1.substr(6)] : "";
      });
    });
  }
};
