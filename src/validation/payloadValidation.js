import ApiError from '../error/ApiError.js'
import { validateEmail, validateNumber } from '../validation/userValidation.js'

const createUserVal = function (req, res, next) {
  let { email, phone } = req.body

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

  if (!validateEmail(email)) {
     return next(ApiError.badRequest('Please Enter Valid Email'))
  }

  if (!validateNumber(phone)) {
    next(ApiError.badRequest('Please Enter Valid Phone Number'))
    return
  }
}

const loginUserVal = function (req, res, next) {
  let { email } = req.body

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

  if (!validateEmail(email))
    next(ApiError.badRequest('Please Enter Valid Email'))
  return
}

const updateUserVal = function (req, res, next) {
  const { email, phone } = req.body

  let keyArray = ['username', 'phone', 'email', 'password']
  if (!Object.keys(req.body).every((elem) => keyArray.includes(elem)))
    return next(
      ApiError.badRequest(
        "Keys should be in this format ['username','phone','email']"
      )
    )

  if(email)
    if (!validateEmail(email))
    return next(ApiError.badRequest('Please Enter valid email'))
  
  if(phone)
    if (!validateNumber(phone))
    return next(ApiError.badRequest('Please Enter valid phone number'))
}
export { createUserVal, loginUserVal, updateUserVal }
