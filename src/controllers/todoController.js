import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createTodo = async (req, res) => {
  const data = req.body
  //console.log(data)
  //todo object like {title:"some task",status:false}
  try {
    const newTodo = await prisma.ToDo.create({
      data
    })

    res.status(200).send({ newTodo, message: 'todo created' })
  } catch (e) {
    res.status(500).send({ message: 'Not fullfilled', error: e.message })
  }
}

const getSingleTodo = async (req, res) => {
  let data = req.params;
  //console.log(data);
  try {
    const uniqueToDo = await prisma.ToDo.findFirst({
      where: {
        id: +data.id,
        isDeleted: false,
      }
    })

    res.status(200).send({ uniqueToDo, message: 'get todo done with content '})
  } catch (e) {
    res.status(500).send({ message: 'Not fullfilled', error: e.message })
  }
}

const getTodo = async (req, res) => {
  const { userid } = req.params
  /**
    params : {
        id : "id of current logged user",
    }
    get all todos based on current logged user */
  try {
    const userDocs = await prisma.ToDo.findMany({
      where: {
        userId: +userid,
        isDeleted: false,
      }
    })

    res.status(200).send({ userDocs, message: 'get todo done' })
  } catch (e) {
    res.status(500).send({ message: 'Not fullfilled', error: e })
  }
}
const patchTodo = async (req, res) => {
  const { todoid } = req.params
  /**
    params : {todoid: "id of a todo"}
    pathch a todo of current logged user based on todo id(unique) */
  const data = req.body
  try {
    const patchedDoc = await prisma.ToDo.update({
      where: {
        id: +todoid
      },
      data
    })

    res.status(200).send({ patchedDoc, message: 'todo patched' })
  } catch (e) {
    res.status(500).send({ message: 'Not fullfilled', error: e })
  }
}

const deleteTodo = async (req, res) => {
  const { todoid } = req.params
  /**
    params : {id: "id of a todo"}
    delete a todo based on id of todo */
  //console.log(req.params)
  try {
    const delDoc = await prisma.ToDo.update({
      where: {
        id: +todoid
      },
      data:{
        isDeleted:true,
      }
    })

    res.status(200).send({ delDoc, message: 'todo deleted' })
  } catch (e) {
    res.status(500).send({ message: 'Not fullfilled', error: e })
  }
}

export { createTodo, deleteTodo, patchTodo, getTodo, getSingleTodo }
