import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async function (req, res) {
  let data = req.body
  console.log(data)

  const newUser = await prisma.user.create({
    data,
  })

  // console.log(newUser)
  res.status(201).send({ status: true, newUser })
}

export const updateUser = async (req, res) => {
  const { email, username, phone } = req.params
  const user = await prisma.post.updateMany({
    where: { email, username, phone },
    data: {
      email: req.body,
      username: req.body,
      phone: req.body,
    },
  })
  res.json(user)
}
