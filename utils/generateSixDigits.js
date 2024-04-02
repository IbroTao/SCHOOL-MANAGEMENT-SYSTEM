exports.uniqueString = () => {
  const stringOne = Date.now().toString(36);
  const stringTwo = Math.random().toString(36).substring(2);
  const d = stringOne + stringTwo;
  return d.slice(0, 4);
};

exports.uniqueSixDigits = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
