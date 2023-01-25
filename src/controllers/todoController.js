import { PrismaClient } from '@prisma/client'
import ApiError from '../error/ApiError.js';

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
const createTodo = async (req, res, next) => {
  const data = req.body
  const user = await prisma.user.findUnique({
    where: {
      id: +data.userId
    }
  })

  if (!user) {
    next(ApiError.NotFound("User Does not exist"))
    return;
  }
  try {
    const newTodo = await prisma.ToDo.create({
      data
    })

    res.status(201).send({ newTodo, message: 'Task created successfully' })
  } catch (e) {
    next(ApiError.internalServerError('Something went wrong, Please try again later!'))
    return;
  }
}

/**
 *  @function getSingleToDo - Gets the most recent ToDo of the user
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getSingleTodo = async (req, res, next) => {
  let data = req.params
  const user = await prisma.user.findUnique({
    where: {
      id: +data.id
    }
  })
  if (!user) {
    return next(ApiError.NotFound("User does not exist"))
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
    return next(ApiError.internalServerError("Something went wrong, Please try again later"))
  }
}

/**
 * @function getTodo - Gets all the active ToDos of the User
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getTodo = async (req, res, next) => {
  const { userid } = req.params

  const user = await prisma.user.findUnique({
    where: {
      id: +userid
    }
  })
  if (!user) {
    return next(ApiError.NotFound("User does not exist")) 
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
    return next(ApiError.userNotFound("Task does not exist"))
  }
}

/**
 * @function patchTodo - To modify an existing ToDo
 * @param {Express.Request} req - Express Request Object containing the updated ToDo data {@link todoBody}
 * @param {Express.Response} res - Express Response Object
 */
const patchTodo = async (req, res, next) => {
  const { todoid } = req.params
  const data = req.body
  try {
    const patchedDoc = await prisma.ToDo.update({
      where: {
        id: +todoid
      },
      data
    })

    res.status(200).send({ patchedDoc, message: 'Task updated successfully' })
  } catch (e) {
    return next(ApiError.NotFound("Task does not exist"))
  }
}

/**
 * @function deleteTodo - Deleted a specific ToDo based upon the ID
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const deleteTodo = async (req, res, next) => {
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

    res.status(204).send({ delDoc, message: 'Task deleted successfully' })
  } catch (e) {
    return next(ApiError.NotFound("Task does not exist"))
  }
}

export { createTodo, deleteTodo, patchTodo, getTodo, getSingleTodo }
