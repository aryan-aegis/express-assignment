import ApiError from './ApiError.js'

// eslint-disable-next-line no-unused-vars
export const apiErrorHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message)
    return
  }
  res.status(500).json(err.message)
}
