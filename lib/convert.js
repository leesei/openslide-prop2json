// convert property value to native JS types (number/boolean)
// TODO: add blacklist to ignore certain keys
module.exports = function(key, value) {
  // try to convert to number
  const num = Number(value);
  if (!isNaN(num)) return num;

  // try to match boolean strings
  if (value === 'True') return true;
  if (value === 'False') return false;

  // return original value as fallback
  return value;
};
