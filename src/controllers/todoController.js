import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createTodo = async (req, res) => {
  const data = req.body
  //todo object like {title:"some task",status:false}
  const newTodo = await prisma.ToDo.create({
    data,
  })

  res.status(200).send({ newTodo, message: 'todo created' })
}

const getTodo = async (req, res) => {
  const { userid } = req.headers
  /**
    headers : {
        userId : "id of current logged user",
    }
    get all todos based on current logged user */
  const userDocs = await prisma.ToDo.findMany({
    where: {
      userId: userid,
    },
  })

  res.status(200).send({ userDocs, message: 'get todo done' })
}
const patchTodo = async (req, res) => {
  const { todoid } = req.headers
  /**
    headers : {todoid: "id of a todo"}
    pathch a todo of current logged user based on todo id(unique) */
  const data = req.body
  const patchedDoc = await prisma.ToDo.update({
    where: {
      id: todoid,
    },
    data,
  })

  res.status(200).send({ patchedDoc, message: 'todo patched' })
}

const deleteTodo = async (req, res) => {
  const { todoid } = req.headers
  /**
    headers : {todoid: "id of a todo"}
    delete a todo based on id of todo */
  const delDoc = await prisma.ToDo.delete({
    where: {
      id: todoid,
    },
  })

  res.status(200).send({ delDoc, message: 'todo deleted' })
}

export { createTodo, deleteTodo, patchTodo, getTodo }
