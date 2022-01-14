const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ 
      error: 'token expired'
    })
  }
    
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}
const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    // eslint-disable-next-line no-undef
    const decodedeToken = jwt.verify(authorization.substring(7), process.env.SECRET)
    request.user = await User.findById(decodedeToken.id)
  } else {
    request.user = null
  }
  next()
} 
  
module.exports = {
  errorHandler, tokenExtractor, userExtractor
}