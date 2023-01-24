import { PrismaClient } from '@prisma/client'
import validateEmail from '../validation/EmailVailidation.js'
import validateNumber from '../validation/PhoneValidation.js'

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
export const createUser = async function (req, res) {
  let data = req.body
  if (!validateEmail(data.email)) {
    res.status(400).send({ status: false, message: 'Enter valid email' })
  } else if (!validateNumber(data.phone)) {
    res.status(400).send({ status: false, message: 'Enter valid phone number' })
  } else {
    const newUser = await prisma.user.create({
      data
    })
    res.status(201).send({ status: true, newUser })
  }
}

/**
 * @function updateUser - Updates the information of an User.
 * @param {Express.Request} req - Express Request Object containing the User data in the body {@link userBody}
 * @param {Express.Response} res
 */
export const updateUser = async (req, res) => {
  const { email, username, phone } = req.body
  if (!validateEmail(email)) {
    res.status(400).send({ status: false, message: 'Enter valid email' })
  } else if (!validateNumber(phone)) {
    res.status(400).send({ status: false, message: 'Enter valid phone number' })
  } else {
    const user = await prisma.user.update({
      where: { email },
      data: {
        email,
        username,
        phone
      }
    })
    res.status(201).send({ status: true, user })
  }
}

/**
 * @function getUser - Gets the information of an User based on the ID
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export const getUser = async function (req, res) {
  let data = req.params
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +data.id
      }
    })

    res
      .status(200)
      .send({ user, message: 'user found with username' + user.username })
  } catch (e) {
    res.status(401).send({ message: 'Not fullfilled', error: e.message })
  }
}
