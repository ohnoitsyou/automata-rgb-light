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
    this.router.get("/:device/co/:color", function(req, res) {
      var device = req.params.device;
      var color = req.params.color;
      request(res.locals.baseURI + "/api/spark/sendCommand/" + device + "/co/" + color, function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not Success: %s", e);
        }
        res.send("Color set to " + color);
      });
    });
    this.router.get("/:device/status", function(req, res) {
      var device = req.params.device;
      request(res.locals.baseURI + "/api/spark/deviceStatus/" + device, function(e, r, b) {
        if(!e && r.statusCode == 200) {
          res.send(b);
        } else {
          res.send("unknown");
        }
      });
    });
    this.router.get("/render", function(req, res) {
      var viewPath = res.locals.pluginDir + "/" + path.relative(res.locals.pluginDir, self.viewsFolder);
      res.locals.app.render(viewPath + "/lights",{layout: null}, function(err, html) {
        res.send(html);
      });
    });
    debug("[LoadRoutes] Finishing");
    return this.router;
  };
  this.registerStaticFolders = function(pluginDir) {
    debug("[RegisterStatics] Starting");
    var folders = [this.stylesFolder, this.scriptsFolder];
    folders = folders.map(function(folder) {
      return path.basename(pluginDir) + "/" +  path.relative(pluginDir, folder);
    });
    debug("[RegisterStatics] Finishing");
    return folders;
  };
  this.registerStyles = function(pluginDir) {
    debug("[RegisterStyles] Starting");
    var files = [], fileList = [],
        filePath = path.join(path.basename(pluginDir), path.relative(pluginDir, this.stylesFolder));
    try {
      fileList = fs.readdirSync(this.stylesFolder);
    } catch(e) {
      debug("[RegisterStyles] Problem: %s", e);
    }
    files = fileList.map(function(file) {
      debug("[RegisterStyles] Found file: %s", file);
      return path.join(filePath, file);
    });
    debug("[RegisterStyles] Finishing");
    return files;
  };
  this.registerScripts = function(pluginDir) {
    debug("[RegisterScripts] Starting");
    var files = [], fileList = [],
        filePath = path.join(path.basename(pluginDir), path.relative(pluginDir, this.scriptsFolder));
    try {
      fileList = fs.readdirSync(this.scriptsFolder);
    } catch(e) {
      debug("[RegisterScripts] Problem: %s", e);
    }
    files = fileList.map(function(file) {
      debug("[RegisterScripts] Found file: %s", file);
      return path.join(filePath, file);
    });
    debug("[RegisterScripts] Finishing");
    return files;
  };
};

module.exports = Lights;
