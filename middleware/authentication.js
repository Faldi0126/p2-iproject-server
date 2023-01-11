const { decodeToken } = require('../helpers/jwt')
const { User, Resort } = require('../models')

// //? Modular Authentication
const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers
    if (!access_token) throw { name: "Invalid token" }

    let payload = jwt.verify(access_token, process.env.JWT_SECRET)

    let user = await User.findByPk(payload.id)

    req.user = { id: user.id }

    if (!user) throw { name: "Invalid token" }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication