const express = require("express");
const uuid = require("uuid");
const errors = require("../errors");

module.exports = class TokenRouter {
  constructor(config){
    // set base path
    this.basePath = "/tokens";
    // set true if require authorized
    this.requireAuth = true;

    const router = this.router = express.Router();

    router.get("/",    this.getAll);
    router.post("/",   this.create);

    router.get("/:name",    this.get);
    router.put("/:name",    this.modify);
    router.delete("/:name", this.delete);
  }

  // implementations
  create(req, res, next){
    const [err, validated] = req.model.Token.precheck.validateSync(req.body);
    if(err) return next(err);
    const data = req.body;
    console.log(data);
    data.user_id = req.session.user.id;
    return new req.model.Token(data).save().then((token)=>{
      res.status(201).json(token);
    }).catch(next);
  }
  getAll(req, res, next){
    return req.model.Token.where({user_id: req.session.user.id}).fetchAll({withRelated: ["rule"]}).then((tokens)=>{
      return res.json(tokens);
    }).catch(next);
  }
  get(req, res, next){
    new req.model.Token({
      user_id: req.session.user.id, name: req.params.name
    }).fetch({require: true}).then((token)=>{
      res.json(token);
    }).catch(next);
  }
  modify(req, res, next){
  }
  delete(req, res, next){
  }
};
