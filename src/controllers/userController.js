import { PrismaClient } from '@prisma/client'
import validateEmail from '../validation/EmailVailidation.js'
import validateNumber from '../validation/PhoneValidation.js'

const prisma = new PrismaClient()

export const createUser = async function (req, res) {
  let data = req.body
  console.log(data)
  if (!validateEmail(data.email)) {
    res.status(400).send({ status: false, message: 'Enter valid email' })
  } else if (!validateNumber(data.phone)) {
    res.status(400).send({ status: false, message: 'Enter valid phone number' })
  } else {
    const newUser = await prisma.user.create({
      data,
    })
    res.status(201).send({ status: true, newUser })
  }
}

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
        phone,
      },
    })
    res.status(201).send({ status: true, user })
  }
}
