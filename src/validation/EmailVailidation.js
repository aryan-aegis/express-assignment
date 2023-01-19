function validateEmail(emailAdress) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(emailAdress)
}

export default validateEmail
