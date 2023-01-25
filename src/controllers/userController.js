import { PrismaClient } from '@prisma/client'
import { validateEmail, validateNumber } from '../validation/userValidation.js'
import ApiError from '../error/ApiError.js'
/**
 * @typedef {Object} userBody
 * @property {string} username - The name of the user
 * @property {string} email - Email of User
 * @property {string} phone - Phone Number of User
 */

const prisma = new PrismaClient()

/**
 * @function createUser - Creates a new User
 * @param {Express.Request} req - Express Request Object containing the User data in the body {@link userBody}
 * @param {Express.Response} res
 */
export const createUser = async function (req, res, next) {
  let data = req.body

  let keyArray = ['username', 'phone', 'email']
  if (
    !Object.keys(req.body).every((elem) => keyArray.includes(elem)) ||
    Object.keys(req.body).length != 3
  ) {
    next(
      ApiError.badRequest(
        "All keys should be given and in this format ['username','phone','email']"
      )
    )
    return
  }

  if (!validateEmail(data.email)) {
    next(ApiError.badRequest('Please Enter Valid Email'))
    return
  }

  if (!validateNumber(data.phone)) {
    next(ApiError.badRequest('Please Enter Valid Phone Number'))
    return
  }

  let newUser = null

  try {
    newUser = await prisma.user.create({
      data
    })
  } catch (err) {
    return next(ApiError.badRequest('Already Exists Email or Phone number'))
  }

  return res.status(201).send({ status: true, newUser })
}

/**
 * @function updateUser - Updates the information of an User.
 * @param {Express.Request} req - Express Request Object containing the User data in the body {@link userBody}
 * @param {Express.Response} res
 */
export const updateUser = async (req, res, next) => {
  const { email, username, phone } = req.body
  const id = req.params.id

  let keyArray = ['username', 'phone', 'email']
  if (!Object.keys(req.body).every((elem) => keyArray.includes(elem)))
    return next(
      ApiError.badRequest(
        "Keys should be in this format ['username','phone','email']"
      )
    )

  if (!validateEmail(email))
    return next(ApiError.badRequest('Please Enter valid email'))
  if (!validateNumber(phone))
    return next(ApiError.badRequest('Please Enter valid phone number'))

  let user = null
  try {
    user = await prisma.user.update({
      where: { id: +id },
      data: {
        email,
        username,
        phone
      }
    })
  } catch (err) {
    return next(ApiError.badRequest('User not found'))
  }
  return res.status(200).send({ status: true, user })
}

/**
 * @function getUser - Gets the information of an User based on the ID
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export const getUser = async function (req, res, next) {
  let data = req.params
  const user = await prisma.user.findUnique({
    where: {
      id: +data.id
    }
  })

  if (!user) return next(ApiError.badRequest('User Does not exist'))

  return res
    .status(200)
    .send({ user, message: 'user found with username ' + user.username })
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  const delDoc = await prisma.User.delete({
    where: {
      id: +id
    }
  })

  return res.status(200).send({ delDoc, message: 'Successfully deleted!' })
}
