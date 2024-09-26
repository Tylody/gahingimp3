const checkNumbersOnly = require("./checkNumbersOnly");

module.exports = (inputTime) => {
  if (!checkNumbersOnly(inputTime)) {
    return;
  }

  let rawSeconds = parseInt(inputTime);
  let outputString = "";
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  seconds = rawSeconds % 60;

  rawSeconds = Math.floor(rawSeconds / 60);
  minutes = rawSeconds % 60;

  rawSeconds = Math.floor(rawSeconds / 60);
  hours = rawSeconds % 60;

  if (hours != 0) {
    outputString = outputString.concat(hours.toString()).concat(":");
  }

  minutes == 0
    ? (outputString = outputString.concat("00:"))
    : (outputString = outputString.concat(minutes.toString()).concat(":"));

  seconds == 0
    ? (outputString = outputString.concat("00"))
    : (outputString = outputString.concat(seconds.toString()));

  return outputString;
};
