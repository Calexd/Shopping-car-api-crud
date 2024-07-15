const {verify} = require('jsonwebtoken')

function validateToken (request, response, next) {

    try {
        const token = request.headers.autorizathion
   
        if(!token) {
            return response.status(400).json({message: "Token no send"})
     
        }

        const jwt = token.split(" ")

        const result =  verify(jwt[1], process.env.SECRET_JWT)

        request.userId = result.id

        next()

    } catch (error) {
        if(error.message === "jwt malformed" || error.message == 'jwt expired') {
            response.status(401).json({menssage: "Token malformed or expired"})
        } else {
            response.status(500).json({menssage: "Verify token failed"})
        }
    }

}

module.exports = validateToken