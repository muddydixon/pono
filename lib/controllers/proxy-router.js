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

    router.get("/:ruleIdentifier", this.proxy);
  }

  // implementations
  proxy(req, res, next){
    const ruleIdentifier = req.params.ruleIdentifier;
    const tokenValue    = req.query.token;

    co(function*(){
      const rule   = yield new req.model.Rule({identifier: ruleIdentifier})
              .fetch({withRelated: ["props"], require: true});
      const token  = yield new req.model.Token({rule_id: rule.get("id"), token: tokenValue}).fetch({require: true});

      token.tryRemote(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
      const result = yield rule.execute(req.query);

      return res.json(result);
    }).catch(next);
  }
};
