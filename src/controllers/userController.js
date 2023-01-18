import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

let createUser = async function (req, res) {
  let data = req.body
  console.log(data)

  const newUser = await prisma.user.create({
    data,
  })

  // console.log(newUser)
  res.status(201).send({ status: true, newUser })
}

export { createUser }
