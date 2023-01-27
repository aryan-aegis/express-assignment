import ApiError from './ApiError.js'
import { Prisma } from '@prisma/client'

// eslint-disable-next-line no-unused-vars
export const apiErrorHandler = (err, req, res, next) => {

  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message)
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json('Check fields provided')
  } else if (err.code == 'P2002')
    return res.status(400).json('Email or phone should be unique')

  res.status(500).json(err.message)
}
