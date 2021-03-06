const Knex = require("knex");
const Bookshelf = require("bookshelf");
const crypto = require("crypto");
const Checkit = require("checkit");
const debug = require("debug")(`${process.title}:model`);
const errors = require("./errors");

const Plugins = {
  "http:": require("./plugins/http"),
  "https:": require("./plugins/http"),
  "mqtt:": require("./plugins/mqtt"),
  "mqtts:": require("./plugins/mqtt"),
  "ws:": require("./plugins/mqtt"),
  "wss:": require("./plugins/mqtt"),
  "fluent:": require("./plugins/fluent")
};

module.exports = (config)=>{
  const knex = Knex(config.database);
  const bookshelf = Bookshelf(knex);

  const User = bookshelf.Model.extend({
    tableName: "users",
    toJSON: function(isUnsafe = false){
      const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
      if(isUnsafe) return attrs;
      delete attrs.id;
      delete attrs.shadow;
      delete attrs.salt;
      return attrs;
    }
  }, {
    signin(username, password){
      return new Promise((resolve, reject)=>{
        return new User({username: username}).fetch({require: true}).then((user)=>{
          const shadow = User.createShadow(username, password, user.get("salt"));
          if(shadow !== user.get("shadow"))
            return reject(new Error(`shadow unmatch expect ${user.get("shadow")}, actual ${shadow}`));
          return resolve(user);
        }).catch((err)=>{
          debug(err.stack);
          throw new errors.InvalidUserParameterError();
        });
      });
    },
    createShadow(username, password, salt){
      const shadow = crypto.createHash("sha256")
              .update(`${username}-${password}-${salt}`)
              .digest("hex");
      return shadow;
    },
    precheck: new Checkit({
      username: ["required", "string", "minLength:1", "maxLength:16"],
      password: ["required", "string", "minLength:1", "maxLength:16"]
    })
  });

  const Prop = bookshelf.Model.extend({
    tableName: "props",
    rule: function(){
      return this.belongsTo(Rule);
    }
  }, {
    precheck: new Checkit({})
  });

  const Rule = bookshelf.Model.extend({
    tableName: "rules",
    tokens: function(){
      return this.hasMany(Token);
    },
    props: function(){
      return this.hasMany(Prop);
    },
    execute: function(query){
      return new Plugins[this.get("protocol")](this.toJSON()).execute(query);
    }
  }, {
    precheck: new Checkit({})
  });

  const Token = bookshelf.Model.extend({
    tableName: "tokens",
    rule(){
      return this.belongsTo(Rule);
    },
    tryRemote(ip){
      const whitelist = this.get("whitelist");
      console.log(this);
      if(whitelist === "" || whitelist === "0.0.0.0/0") return true;
      return true;
    }
  }, {
    precheck: new Checkit({
      name: ["required", "string", "minLength:1", "maxLength:16"]
    })
  });

  const Log = bookshelf.Model.extend({
    tableName: "logs",
    rule(){
      return this.belongsTo(Rule);
    },
    token(){
      return this.belongsTo(Token);
    }
  }, {
    precheck: new Checkit({
      remote_addr: ["required", "string", "minLength:7", "maxLength:16"]
    })
  });


  // exports
  return {
    User,
    Prop,
    Rule,
    Token
  };
};
