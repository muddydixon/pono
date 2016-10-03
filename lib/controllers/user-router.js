const express = require("express");
const uuid = require("uuid");
const errors = require("../errors");

module.exports = class UserRouter {
  constructor(config){
    // set base path
    this.basePath = "/users";
    // set true if require authorized
    this.requireAuth = false;

    const router = this.router = express.Router();

    router.post("/signup",    this.signup);
    router.post("/signin",    this.signin);
    router.all("/signout",    this.signout);
    router.get("/current",    this.getAuthUser);
    router.get("/",           this.getUsers);

    router.get("/:userId",    this.getUser);
    router.put("/:userId",    this.modifyUser);
    router.delete("/:userId", this.deleteUser);
  }

  // implementations
  signup(req, res, next){
    const [err, validated] = req.model.User.precheck.validateSync(req.body);
    if(err) return next(new errors.UnauthorizedError());
    const salt = uuid().replace(/\-/g, "");
    const shadow = req.model.User.createShadow(req.body.username, req.body.password, salt);
    return new req.model.User({username: req.body.username, salt, shadow}).save().then((user)=>{
      req.session.user = user.toJSON(true);
      res.status(201).json(user);
    }).catch(next);
  }
  signin(req, res, next){
    const [err, validated] = req.model.User.precheck.validateSync(req.body);
    if(err) return next(new errors.UnauthorizedError());
    return req.model.User.signin(req.body.username, req.body.password).then((user)=>{
      req.session.user = user.toJSON(true);
      res.json(user);
    }).catch(next);
  }
  signout(req, res, next){
    req.session.destroy();
    res.json({});
  }
  getAuthUser(req, res, next){
    if(!req.session.user){
      res.status(401);
      return next(new errors.UnauthorizedError());
    }
    return new req.model.User({username: req.session.user.username}).fetch({require: true}).then((user)=>{
      return res.json(user);
    }).catch(next);
  }
  getUsers(req, res, next){
    req.model.User.fetchAll().then((users)=>{
      res.json(users);
    }).catch(next);
  }
  getUser(req, res, next){
  }
  modifyUser(req, res, next){
  }
  deleteUser(req, res, next){
  }
};
