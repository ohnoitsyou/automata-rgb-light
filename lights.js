var express = require('express');
var router = express.Router();

var Lights = function() {
  this.version = '0.1.0',
  this.load = function() {
    var requires = {'spark': '0.1.0'};
    return requires;
  },
  this.initilize = function() {
    // here is where the module should login to spark
    // What would make this better would be a spark module
    //  so that any other plugins that utilize the spark api
    //  don't have to each login.
    //  Shared credentials
    return true;
  }
}

module.exports = Lights;
