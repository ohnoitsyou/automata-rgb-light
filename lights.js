"use strict";
var express = require("express");
var debug = require("debug")("lights");
var request = require("request");

var Lights = function() {
  this.version = "0.1.0";
  this.requires = [{"spark": "0.1.0"}];
  this.router = express.Router();
  this.baseURI = "http://automata.ohnoitsyou.net";
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
  this.loadRoutes = function() {
    debug("[LoadRoutes] Starting");
    var self = this;
    this.router.get("/", function(req, res) {
      res.send("Lights!");
    });
    this.router.get("/on/:device", function(req, res) {
      var device = req.params.device;
      request(self.baseURI + "/api/spark/sendCommand/" + device + "/on", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
          res.send(b);
        } else {
          debug("Not Success: %s", e);
          res.send(b);
        }
      });
    });
    this.router.get("/off/:device", function(req, res) {
      var device = req.params.device;
      request(self.baseURI + "/api/spark/sendCommand/" + device + "/off", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
      });
      res.send("Lights off!");
    });
    this.router.get("/ts/:device", function(req, res) {
      var device = req.params.device;
      debug("URL: %s", self.baseURI + "/api/spark/sendCommand/" + device + "/ts/0");

      request(self.baseURI + "/api/spark/sendCommand/" + device + "/ts/0", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
      });
      res.send("Lights toggled!");
    });
    this.router.get("/ro/:device/:routine", function(req, res) {
      var device = req.params.device;
      var routine = req.params.routine;
      request(self.baseURI + "/api/spark/sendCommand/" + device + "/ro/" + routine, function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
        res.send("Routine Changed!");
      });
    });
    debug("[LoadRoutes] Finishing");
    return this.router;
  };
};

module.exports = Lights;
