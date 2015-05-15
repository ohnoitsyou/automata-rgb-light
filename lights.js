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
    // here is where the module should login to spark
    // What would make this better would be a spark module
    //  so that any other plugins that utilize the spark api
    //  don't have to each login.
    //  Shared credentials
    debug("[Initilize] Finishing");
    return true;
  };
  this.loadRoutes = function() {
    debug("[LoadRoutes] Starting");
    var self = this;
    this.router.get("/", function(req, res) {
      request("/api/spark/sendCommand/lights/off", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
      });
      res.send("Lights!");
    });
    this.router.get("/on", function(req, res) {
      request(self.baseURI + "/api/spark/sendCommand/lights/on", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
      res.send("Lights on!");
      });
    });
    this.router.get("/off", function(req, res) {
      request(self.baseURI + "/api/spark/sendCommand/lights/off", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
      });
      res.send("Lights off!");
    });
    debug("[LoadRoutes] Finishing");
    return this.router;
  };
};

module.exports = Lights;
