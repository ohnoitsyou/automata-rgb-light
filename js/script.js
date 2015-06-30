var ajaxOpt = {method:"get"};
function lightsOn() {
  $.ajax("/api/lights/oniy-lights/on", ajaxOpt)
    .done(updateResponse);
}
function lightsOff() {
  $.ajax("/api/lights/oniy-lights/off", ajaxOpt)
    .done(updateResponse);
}
function toggleSilent() {
  $.ajax("/api/lights/oniy-lights/ts", ajaxOpt)
    .done(updateResponse);
}
function setMode(mode) {
  $.ajax("/api/lights/oniy-lights/ro/" + mode, ajaxOpt)
    .done(updateResponse);
}
function setColor() {
  var r = parseInt($("#rValue").val())|| 0,
      g = parseInt($("#gValue").val())|| 0,
      b = parseInt($("#bValue").val())|| 0;
  var color = r + ":" + g + ":" + b;
  console.log(color);
  // first set the routine to static then send the new color
  $.ajax("/api/lights/oniy-lights/ro/3", ajaxOpt)
    .done(function(data) {
      $.ajax("/api/lights/oniy-lights/co/" + color, ajaxOpt)
        .done(updateResponse);
    });
}
function updateResponse(data, status, jqXHR) {
  $("#lightsResponse").html(data);
}
