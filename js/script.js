var Lights = (function() {
  var lights_io = io("/lights");
  lights_io.on('connection', function(socket) {
    console.log('lights connected');
  });
  var ajaxOpt = {method:"get"};
  var devStatus = false;
  return {
    lightsOn: function() {
      $.ajax("/api/lights/oniy-lights/on", ajaxOpt)
        .done(this.updateResponse);
    },
    lightsOff: function() {
      $.ajax("/api/lights/oniy-lights/off", ajaxOpt)
        .done(this.updateResponse);
    },
    toggleSilent: function() {
      $.ajax("/api/lights/oniy-lights/ts", ajaxOpt)
        .done(this.updateResponse);
    },
    setMode: function(mode) {
      $.ajax("/api/lights/oniy-lights/ro/" + mode, ajaxOpt)
        .done(this.updateResponse);
    },
    setColor: function() {
      var r = parseInt($("#rValue").val())|| 0,
          g = parseInt($("#gValue").val())|| 0,
          b = parseInt($("#bValue").val())|| 0;
      var color = r + ":" + g + ":" + b;
      console.log(color);
      // first set the routine to static then send the new color
      $.ajax("/api/lights/oniy-lights/ro/3", ajaxOpt)
        .done(function(data) {
          $.ajax("/api/lights/oniy-lights/co/" + color, ajaxOpt)
            .done(this.updateResponse);
        });
    },
    updateResponse: function(data, status, jqXHR) {
      $("#lightsResponse").html(data);
    },
    getLightsStatus: function() {
      var self = this;
      $.ajax("/api/lights/oniy-lights/status")
        .done(function(data, status, jqXHR) {
          console.log(typeof data);
          if(["true","false","unknown"].indexOf(data) !== -1) {
            devStatus = data;
          } else {
            devStatus = "unknown";
          }
          self.setLightsStatus();
        });
    },
    setLightsStatus: function() {
      console.log("setting status");
      console.log(devStatus);
      if(devStatus === "true") {
        $("#lightsStatus").html("Connected");
      } else if(devStatus === "false") {
        $("#lightsStatus").html("Disconnected");
      } else {
        $("#lightsStatus").html("unknown");
      }
    }
  }
})();
Lights.getLightsStatus();
// refresh once a minute
var getLightsStatusTimeout = setTimeout(Lights.getLightsStatus,60000);
