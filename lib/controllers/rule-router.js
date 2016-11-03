const express = require("express");
const uuid = require("uuid");
const co = require("co");
const errors = require("../errors");

module.exports = class RuleRouter {
  constructor(config){
    // set base path
    this.basePath = "/rules";
    // set true if require authorized
    this.requireAuth = true;

    const router = this.router = express.Router();

    router.get("/",    this.getAll);
    router.post("/",   this.create);

    router.get("/:ruleName",    this.get);
    router.put("/:ruleName",    this.modify);
    router.delete("/:ruleName", this.delete);
  }

  // implementations
  create(req, res, next){
    const [err, validated] = req.model.Rule.precheck.validateSync(req.body);
    if(err) return next(err);
    const data = req.body;
    data.identifier = uuid().replace(/-/g, "");
    data.user_id = req.session.user.id;
    return new req.model.Rule(data).save().then((rule)=>{
      res.status(201).json(rule);
    }).catch((err)=>{
      res.status(500);
      next(err);
    });
  }
  getAll(req, res, next){
    return req.model.Rule.where({
      user_id: req.session.user.id
    }).fetchAll({withRelated: ["tokens", "props"]}).then((rules)=>{
      res.json(rules);
    }).catch(next);
  }
  get(req, res, next){
    new req.model.Rule({
      user_id: req.session.user.id, name: req.params.ruleName
    }).fetch({require: true}).then((rule)=>{
      res.json(rule);
    }).catch(next);
  }
  modify(req, res, next){
  }
  delete(req, res, next){
    co(function*(){
      const rule = yield new req.model.Rule({
        user_id: req.session.user.id, name: req.params.ruleName
      }).fetch();
      yield rule.destroy();
      res.json({});
    }).catch(next);
  }
};
