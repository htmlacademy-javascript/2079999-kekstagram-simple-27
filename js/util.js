/**
 * Проверка длины строки
 * @param {string} str — исходная строка
 * @param {number} len — количество симолов для проверки
 * @return {boolean} — истина, если строка в диапазоне
 */
function isStrLengthCorrect(str, len) {
  return (str.length <= len);
}

isStrLengthCorrect('', 20);
