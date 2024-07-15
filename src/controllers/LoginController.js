const User = require('../models/user')
const { compare } = require('bcryptjs')
const {sign} = require('jsonwebtoken')

class LoginController {
    async login(request, response) {

        try {

        const data = request.body

        if(!data.email || !data.password){
            return response.status(400).json({message:  "Email and password are required"})
        }

        const user = await User.findOne({
            where: {
                email: data.email,
            }
        })


        if(!user){
            return response.status(404).json({message: "No account found"})
        }

        const passwordCorrect = await compare(data.password, user.password_hash)

        if(passwordCorrect === false) {
            return response.status(404).json({message: "Invalid email or password, please try again."})
        }

        const token = sign(
            {
            id: user.id
        }, 
        process.env.SECRET_JWT, 
        {
            expiresIn: '1d'
        })


        response.json(
            {
                token: token,
                name: user.name
            })

        } catch (error) {
            response.status(500).json({message: 'catch do login'})
        }
        



    }
    
}

module.exports = new LoginController()