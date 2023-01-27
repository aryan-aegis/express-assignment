import jwt from 'jsonwebtoken'
import ApiError from '../error/ApiError.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const authentication = async function (req, res, next) {
  let token = req.headers['x-api-key']
  let id = req.params.id

  //searching for user in each api call with id in path param, remove from others
  let searchUser = null
  try {
    searchUser = await prisma.user.findFirst({
      where: {
        id: +id
      }
    })
  } catch (err) {
    return next(err)
  }
  if (!searchUser) return next(ApiError.NotFound('User not found'))

  jwt.verify(token, process.env.SECRET_KEY, function (err, result) {
    if (err) return next(ApiError.authenticationError(err.message))

    req.headers['id'] = result
    next()
  })
}

const authorization = async function (req, res, next) {
  let tokenId = req.headers['id']
  let paramId = req.params.id

  if (paramId != tokenId)
    return next(ApiError.authorizationError('userId doesnt match given token'))

  next()
}

export { authentication, authorization }
