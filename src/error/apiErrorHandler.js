import ApiError from './ApiError.js'

export const apiErrorHandler = (err, _req, res) => {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message)
    return
  }

  res.status(500).json('Something went wrong!')
}
