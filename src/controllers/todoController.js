import { PrismaClient } from '@prisma/client'

/**
 * @typedef {Object} todoBody
 * @property {string} content - content of the ToDo
 * @property {number} userId - The Id of the corresponding user who created the ToDo
 * @property {boolean} done - Flag to check whether the ToDo has been completed or not
 * @property {boolean} isDeleted -  Flag to check whether the ToDo has been deleted by the user
 */

const prisma = new PrismaClient()

/**
 * @function createToDo - To create a new TODO from the body object in Express Request
 * @param {Express.Request} req - Express Request Object containing the new ToDo data in the body {@link todoBody}
 * @param {Express.Response} res - Express Response Object
 */
const createTodo = async (req, res) => {
  const data = req.body
  const user = await prisma.user.findUnique({
    where:{
      id:+data.userId
    }
  })
  if(!user){
    return res.status(404).send({message:"User not found!"})
  }
  try {
    const newTodo = await prisma.ToDo.create({
      data
    })

    res.status(201).send({ newTodo, message: 'todo created' })
  } catch (e) {
    res.status(400).send({ message: 'Something went wrong, try again', error: e.message })
  }
}

/**
 *  @function getSingleToDo - Gets the most recent ToDo of the user
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getSingleTodo = async (req, res) => {
  let data = req.params
  const user = await prisma.user.findUnique({
    where:{
      id:+data.userId
    }
  })
  if(!user){
    return res.status(404).send({message:"User not found!"})
  }
  try {
    const uniqueToDo = await prisma.ToDo.findFirst({
      where: {
        id: +data.id,
        isDeleted: false
      }
    })

    res.status(200).send({ uniqueToDo, message: 'successful' })
  } catch (e) {
    res.status(400).send({ message: 'something went wrong', error: e.message })
  }
}

/**
 * @function getTodo - Gets all the active ToDos of the User
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getTodo = async (req, res) => {
  const { userid } = req.params

  const user = await prisma.user.findUnique({
    where:{
      id:+data.userId
    }
  })
  if(!user){
    return res.status(404).send({message:"User not found!"})
  }
  try {
    const userDocs = await prisma.ToDo.findMany({
      where: {
        userId: +userid,
        isDeleted: false
      }
    })

    res.status(200).send({ userDocs, message: 'get todo done' })
  } catch (e) {
    res.status(404).send({ message: 'todo not found', error: e })
  }
}

/**
 * @function patchTodo - To modify an existing ToDo
 * @param {Express.Request} req - Express Request Object containing the updated ToDo data {@link todoBody}
 * @param {Express.Response} res - Express Response Object
 */
const patchTodo = async (req, res) => {
  const { todoid } = req.params
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
    res.status(404).send({ message: 'todo not found', error: e })
  }
}

/**
 * @function deleteTodo - Deleted a specific ToDo based upon the ID
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const deleteTodo = async (req, res) => {
  const { todoid } = req.params
  try {
    const delDoc = await prisma.ToDo.update({
      where: {
        id: +todoid
      },
      data: {
        isDeleted: true
      }
    })

    res.status(204).send({ delDoc, message: 'todo deleted' })
  } catch (e) {
    res.status(404).send({ message: 'todo not found', error: e })
  }
}

export { createTodo, deleteTodo, patchTodo, getTodo, getSingleTodo }
