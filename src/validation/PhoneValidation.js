/**
 * @function validateNumber - To validate a phone Number
 * @param {string} input_str - The Number that needs to be validated
 * @returns {boolean}  returns true if the given string is a valid  phone numnber
 */

function validateNumber(input_str) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

  return re.test(input_str)
}

export default validateNumber
