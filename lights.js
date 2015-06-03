"use strict";
var express = require("express");
var debug = require("debug")("lights");
var request = require("request");
var path = require("path");

var Lights = function() {
  this.version = "0.1.0";
  this.requires = [{"spark": "0.1.0"}];
  this.router = express.Router();
  this.routines = ['off','random','fade','static'];
  //this.spark;
  this.load = function(options) {
    debug("[Load] Starting");
    debug("[Load] Finishing");
  };
  this.initilize = function() {
    debug("[Initilize] Starting");
    // The module doesn't need to handle login
    // Login is done as part of the spark plugin init
    debug("[Initilize] Finishing");
    return true;
  };
  this.loadRoutes = function(iapp) {
    debug("[LoadRoutes] Starting");
    var self = this;
    var gApp = iapp;
    this.router.get("/", function(req, res) {
      res.send("Lights!");
    });
    this.router.get("/:device/on", function(req, res) {
      var device = req.params.device;
      var routine = Math.floor(Math.random() * (4 - 1)) + 1;
      debug(routine);
      request(res.locals.baseURI + "/api/spark/sendCommand/" + device + "/ro/" + routine, function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
          res.send(b);
        } else {
          debug("Not Success: %s", e);
          res.send(b);
        }
      });
    });
    this.router.get("/:device/off", function(req, res) {
      var device = req.params.device;
      request(res.locals.baseURI + "/api/spark/sendCommand/" + device + "/ro/0", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
      });
      res.send("Lights off!");
    });
    this.router.get("/:device/ts", function(req, res) {
      var device = req.params.device;
      debug("URL: %s", res.locals.baseURI + "/api/spark/sendCommand/" + device + "/ts/0");

      request(res.locals.baseURI + "/api/spark/sendCommand/" + device + "/ts/0", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
      });
      res.send("Lights toggled!");
    });
    this.router.get("/:device/ro/:routine", function(req, res) {
      var device = req.params.device;
      var routine = req.params.routine;
      request(res.locals.baseURI + "/api/spark/sendCommand/" + device + "/ro/" + routine, function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
        res.send("Routine changed to " + self.routines[routine] + "!");
      });
    });
    this.router.get("/render", function(req, res) {
      debug("[Render] Rendering");
      res.send('/views/lights.html');
    });
    debug("[LoadRoutes] Finishing");
    return this.router;
  };
};

module.exports = Lights;
