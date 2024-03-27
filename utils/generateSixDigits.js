exports.generateSixDigits = () => {
  const minNum = 100000;
  const maxNum = 999999;

  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};
