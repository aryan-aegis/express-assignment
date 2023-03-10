class ApiError {
  constructor(code, message) {
    this.code = code
    this.message = message
  }

  static badRequest(msg) {
    return new ApiError(400, msg)
  }

  static internalServerError(msg) {
    return new ApiError(500, msg)
  }

  static NotFound(msg) {
    return new ApiError(404, msg)
  }
  static authenticationError(msg) {
    return new ApiError(401, msg)
  }
  static authorizationError(msg) {
    return new ApiError(403, msg)
  }
}

export default ApiError
