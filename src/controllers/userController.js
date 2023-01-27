import { PrismaClient } from '@prisma/client'
import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  createUserVal,
  loginUserVal,
  updateUserVal
} from '../validation/payloadValidation.js'
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
const createUser = async function (req, res, next) {
  let { username, password, email, phone } = req.body

  let move = createUserVal(req, res, next)
  if (!move) return
  let newUser = null
  password = await bcrypt.hash(password, 10)

  try {
    newUser = await prisma.user.create({
      data: { username, password, phone, email }
    })
  } catch (err) {
    return next(ApiError.internalServerError(err.message))
  }

  return res.status(201).send({ status: true, newUser })
}

const loginUser = async function (req, res, next) {
  let { email, password } = req.body

  let move = loginUserVal(req, res, next)
  if (!move) return

  let searchUser = await prisma.user.findFirst({
    where: {
      email
    }
  })
  if (!searchUser) return next(ApiError.NotFound('User not found'))

  let compare = await bcrypt.compare(password, searchUser.password)
  if (!compare) return next(ApiError.badRequest('Please enter valid password'))

  let token = null
  jwt.sign(
    searchUser.id.toString(),
    process.env.SECRET_KEY,
    function (err, result) {
      if (err) return next(ApiError.badRequest(err.message))

      token = result
      return res.status(200).send({ message: 'login successful', token })
    }
  )
}

/**
 * @function updateUser - Updates the information of an User.
 * @param {Express.Request} req - Express Request Object containing the User data in the body {@link userBody}
 * @param {Express.Response} res
 */
const updateUser = async (req, res, next) => {
  const { email, username, phone, password } = req.body
  const id = req.params.id

  let move = updateUserVal(req, res, next)
  if (!move) return
  let user = null
  user = await prisma.user.update({
    where: { id: +id },
    data: {
      email,
      username,
      phone,
      password
    }
  })

  return res.status(200).send({ status: true, user })
}

/**
 * @function getUser - Gets the information of an User based on the ID
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getUser = async function (req, res, next) {
  let data = req.params
  const user = await prisma.user.findUnique({
    where: {
      id: +data.id
    }
  })

  if (!user) return next(ApiError.NotFound('User not found'))

  return res
    .status(200)
    .send({ user, message: 'user found with username ' + user.username })
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  const delDoc = await prisma.User.delete({
    where: {
      id: +id
    }
  })

  return res.status(200).send({ delDoc, message: 'Successfully deleted!' })
}

export { createUser, updateUser, deleteUser, getUser, loginUser }
