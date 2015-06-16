"use strict";
var express = require("express");
var debug = require("debug")("lights");
var request = require("request");
var path = require("path");
var fs = require("fs");

var Lights = function() {
  this.version = "0.1.0";
  this.requires = [{"spark": "0.1.0"}];
  this.router = express.Router();
  this.routines = ['off','random','fade','static'];
  this.viewsFolder = __dirname + "/views";
  this.stylesFolder = __dirname + "/css";
  this.scriptsFolder = __dirname + "/js";

  this.sparkEndpoint;

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
      request(res.locals.baseURI + "/api/spark/sendCommand/" + device + "/ro/" + routine, function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
        res.send("Lights on!");
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
      var viewPath = res.locals.pluginDir + "/" + path.relative(res.locals.pluginDir, self.viewsFolder);
      res.locals.app.render(viewPath + "/lights", function(err, html) {
        res.send(html);
      });
    });
    debug("[LoadRoutes] Finishing");
    return this.router;
  };
  this.registerStaticFolders = function(pluginDir) {
    debug("[RegisterStatics] Starting");
    debug("[RegisterStatics] Finishing");
    var folders = [this.stylesFolder, this.scriptsFolder];
    folders = folders.map(function(folder) {
      return path.basename(pluginDir) + "/" +  path.relative(pluginDir, folder);
    });
    return folders;
  };
  this.registerStyles = function(pluginDir) {
    debug("[RegisterStyles] Starting");
    var files = [];
    try {
      var fileList = fs.readdirSync(this.stylesFolder);
      files = fileList.map(function(file) {
        var filePath = path.basename(pluginDir) + "/" + path.relative(pluginDir, this.stylesFolder);
        debug("[RegisterStyles] Path: %s", filePath + "/" + file);
        return filePath + "/" + file;
      }, this);
    } catch(e) {
      debug("[RegisterStyles] Problem: %s", e);
    }
    debug("[RegisterStyles] Finishing");
    return files;
  };
  this.registerScripts = function(pluginDir) {
    debug("[RegisterScripts] Starting");
    var files = [];
    try {
      var fileList = fs.readdirSync(this.scriptsFolder);
      files = fileList.map(function(file) {
        debug("[RegisterScripts] Found script: %s", file);
        var filePath = path.basename(pluginDir) + "/" +  path.relative(pluginDir, this.scriptsFolder);
        debug("[RegisterScripts] Path: %s", filePath + "/" + file);
        return filePath + "/" + file;
      }, this);
    } catch(e) {
      debug("[RegisterScripts] Problem: %s", e);
    }
    debug("[RegisterScripts] Finishing");
    return files;
  };
};

module.exports = Lights;
