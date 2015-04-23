var express = require('express');
var debug = require('debug')('lights');

var Lights = function() {
  this.version = '0.1.0',
  this.requires = [{'spark': '0.1.0'}],
  this.router = express.Router(),
  this.spark,
  this.load = function(options) {
    debug('[Load] Starting');
    debug('[Load] Finishing');
  },
  this.initilize = function() {
    debug('[Initilize] Starting');
    // here is where the module should login to spark
    // What would make this better would be a spark module
    //  so that any other plugins that utilize the spark api
    //  don't have to each login.
    //  Shared credentials
    debug('[Initilize] Finishing');
    return true;
  },
  this.loadRoutes = function() {
    debug('[LoadRoutes] Starting');
    this.router.get('/', function(req, res) {
      res.send('Lights!');
    });
    debug('[LoadRoutes] Finishing');
    return this.router;
  }
}

module.exports = Lights;
