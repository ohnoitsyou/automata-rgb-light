function lightsOn() {
  new Ajax.Request("/api/lights/oniy-lights/on", {
    method : "get",
    onSuccess: function(data) {
      console.log(data.responseText);
    }
  });
}
function lightsOff() {
  new Ajax.Request("/api/lights/oniy-lights/off", {
    method : "get",
    onSuccess: function(data) {
      console.log(data.responseText);
    }
  });
}
function toggleSilent() {
  new Ajax.Request("/api/lights/oniy-lights/ts", {
    method: "get",
    onSuccess: function(data) {
      console.log(data.responseText);
    }
  });
}
function setMode(mode) {
  new Ajax.Request("/api/lights/oniy-lights/ro/" + mode, {
    method: "get",
    onSuccess: function(data) {
      console.log(data.responseText);
    }
  });
}
