/**
 * @function validateEmail - To validate a string as an email
 * @param {string} emailAdress  String to be validated
 * @returns {boolean}  returns true if given string is an email
 */

function validateEmail(emailAdress) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(emailAdress)
}

/**
 * @function validateNumber - To validate a phone Number
 * @param {string} input_str - The Number that needs to be validated
 * @returns {boolean}  returns true if the given string is a valid  phone numnber
 */

function validateNumber(input_str) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

  if (typeof input_str == 'string' && re.test(input_str)) return true
  else return false
}

export { validateNumber, validateEmail }
