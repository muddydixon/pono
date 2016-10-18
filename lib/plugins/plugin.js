module.exports = class Plugin {
  constructor(rule){
    if(!rule) throw new Error("rule required");
    this.rule = rule;
  }
  expandPlaceholder(val, props, query){
    return val.replace(/\$\{[^\}]+\}/g, (m)=>{
      return m.replace(/\$\{([^\}]+)\}/, (m0, m1)=>{
        if(m1.indexOf("query") === 0) return query[m1.substr(6)];
        if(m1.indexOf("props") === 0) return props[m1.substr(6)];
        return "";
      });
    });
  }
};
