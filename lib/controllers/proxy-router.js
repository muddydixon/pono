const express = require("express");
const uuid = require("uuid");
const co = require("co");
const errors = require("../errors");

module.exports = class ProxyRouter {
  constructor(config){
    // set base path
    this.basePath = "/proxy";
    // set true if require authorized
    this.requireAuth = false;

    const router = this.router = express.Router();

    router.get("/:ruleName", this.proxy);
  }

  // implementations
  proxy(req, res, next){
    const rule = req.params.ruleName;

    co(function*(){
      const token = yield new req.model.Token({token: req.query.token}).fetch({require: true});
      const rule  = yield new req.model.Rule({id: token.rule.id, name: rule}).fetch({require: true});

      const result = yield rule.execute();

      return res.json(result);
    }).catch(next);
  }
};
