/**
 * @function validateEmail - To validate a string as an email
 * @param {string} emailAdress  String to be validated
 * @returns {boolean}  returns true if given string is an email
 */

function validateEmail(emailAdress) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(emailAdress)
}

export default validateEmail
