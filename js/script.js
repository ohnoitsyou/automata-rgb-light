var Lights = (function() {
  var ajaxOpt = {method:"get"};
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
    }
  }
})();
