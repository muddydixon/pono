const express = require("express");
const uuid = require("uuid");
const errors = require("../errors");

module.exports = class PropRouter {
  constructor(config){
    // set base path
    this.basePath = "/props";
    // set true if require authorized
    this.requireAuth = true;

    const router = this.router = express.Router();

    router.get("/",    this.getAll);
    router.post("/",   this.create);

    router.get("/:key",    this.get);
    router.put("/:key",    this.modify);
    router.delete("/:key", this.delete);
  }

  // implementations
  create(req, res, next){
    const [err, validated] = req.model.Prop.precheck.validateSync(req.body);
    if(err) return next(err);
    const data = req.body;
    data.user_id = req.session.user.id;
    return new req.model.Props(data).save().then((prop)=>{
      res.status(201).json(prop);
    }).catch(next);
  }
  getAll(req, res, next){
    return req.model.Prop.where({user_id: req.body.user.id}).fetchAll().then((props)=>{
      res.json(props);
    }).catch(next);
  }
  get(req, res, next){
    new req.model.Prop({
      user_id: req.session.user.id, key: req.params.key
    }).fetch({require: true}).then((prop)=>{
      res.json(prop);
    }).catch(next);
  }
  modify(req, res, next){
  }
  delete(req, res, next){
  }
};
