function validateNumber(input_str) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

  return re.test(input_str)
}

export default validateNumber
