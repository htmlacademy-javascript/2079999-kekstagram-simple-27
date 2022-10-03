function getRandomNum(min, max) {
  if (min < 0 || min > max) {
    return NaN;
  }
  return Math.round(min + Math.random() * (max - min));
}

function isStrLenghtCorrect(str, len) {
  return (str.length <= len);
}

getRandomNum();
isStrLenghtCorrect();
