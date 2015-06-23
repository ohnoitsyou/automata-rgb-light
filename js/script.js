function lightsOn() {
  $.ajax("/api/lights/oniy-lights/on", { method : "get" })
    .done(updateResponse);
}
function lightsOff() {
  $.ajax("/api/lights/oniy-lights/off", { method : "get" })
    .done(updateResponse);
}
function toggleSilent() {
  $.ajax("/api/lights/oniy-lights/ts", { method : "get" })
    .done(updateResponse);
}
function setMode(mode) {
  $.ajax("/api/lights/oniy-lights/ro/" + mode, { method : "get" })
    .done(updateResponse);
}
function updateResponse(data, status, jqXHR) {
  $("#llghtsResponse").html(data);
}
