const checkNumbersOnly = require("./checkNumbersOnly");

module.exports = (inputTime) => {
  if (!checkNumbersOnly(inputTime)) {
    throw "Not a valid time!";
  }

  const splitTime = inputTime.split(":");

  for (let i = 0; i < splitTime.length; i++) {
    splitTime[i] = parseInt(splitTime[i]);
  }

  switch (splitTime.length) {
    case 1:
      return splitTime[0];
    case 2:
      return splitTime[0] * 60 + splitTime[1];
    case 3:
      return splitTime[0] * 3600 + splitTime[1] * 60 + splitTime[2];
    default:
      return 0;
  }
};
