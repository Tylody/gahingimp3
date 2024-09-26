module.exports = (inputString) => {
  for (let i = 0; i < inputString.length; i++) {
    if (inputString.charCodeAt(i) > 58 || inputString.charCodeAt(i) < 48) {
      return false;
    }
  }
  return true;
};
