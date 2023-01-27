import ApiError from '../error/ApiError.js'
import { validateEmail, validateNumber } from '../validation/userValidation.js'

const createUserVal = function (req, res, next) {
  let { email, phone, password } = req.body

  let keyArray = ['username', 'phone', 'email', 'password']
  if (
    !Object.keys(req.body).every((elem) => keyArray.includes(elem)) ||
    Object.keys(req.body).length != 4
  ) {
    next(
      ApiError.badRequest(
        "All keys should be given and in this format ['username','phone','email', 'password']"
      )
    )
    return
  }
  if (typeof (password) !== "string") {
    next(ApiError.badRequest('Please Enter Valid Password'))
    return false
  }

  if (!validateEmail(email)) {
    return next(ApiError.badRequest('Please Enter Valid Email'))
  }

  if (!validateNumber(phone)) {
    next(ApiError.badRequest('Please Enter Valid Phone Number'))
    return
  }

  next()
}

const loginUserVal = function (req, res, next) {
  let { email, password } = req.body

  let keyArray = ['email', 'password']
  if (
    !Object.keys(req.body).every((elem) => keyArray.includes(elem)) ||
    Object.keys(req.body).length != 2
  ) {
    return next(
      ApiError.badRequest(
        "All keys should be given and in this format ['email', 'password']"
      )
    )
  }
  if (typeof (password) !== "string") {
    next(ApiError.badRequest('Please Enter Valid Password'))
    return false
  }

  if (!validateEmail(email))
    return next(ApiError.badRequest('Please Enter Valid Email'))

  next()
}

const updateUserVal = function (req, res, next) {
  const { email, phone, password } = req.body

  let keyArray = ['username', 'phone', 'email', 'password']
  if (!Object.keys(req.body).every((elem) => keyArray.includes(elem)))
    return next(
      ApiError.badRequest(
        "Keys should be in this format ['username','phone','email']"
      )
    )
  if(password)
  if (typeof (password) !== "string") {
      next(ApiError.badRequest('Please Enter Valid Password'))
      return false
    }

  if (email)
    if (!validateEmail(email))
      return next(ApiError.badRequest('Please Enter valid email'))

  if (phone)
    if (!validateNumber(phone))
      return next(ApiError.badRequest('Please Enter valid phone number'))

  next()
}
export { createUserVal, loginUserVal, updateUserVal }
