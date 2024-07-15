const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const { password } = require('../config/database.config');
const User = require('../models/user')



class UserController {
    async createAccount(request, response) {
        try {
            const data = request.body
    
            if(!data.name) {
                return response.status(400).json({message: 'The name is required'})
            }
    
            if(!data.email) {
                return response.status(400).json({message: 'The email is required'})
            }
    
    
            if(regexEmail.test(data.email) === false) {
                return response.status(400).json({message: "Invalid email format. Please enter a valid email address."})
            }
    
            if(!(data.password?.length >= 8 && data.password?.length <=16)){
                return response.status(400).json({message: "Password must be between 8 and 16 characters long. Please enter a valid password."})
            }

            const userExist = await User.findOne({
                where: {
                    email: data.email
                }
            })

            if(userExist) {
                return response.status(409).json({message: "The email address is already registered. Please use a different email."})
            }
            
            const user = await User.create({
                ...data,
                password_hash: data.password
            })

            response.status(201).json({
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            })

        } catch (error) {
            console.log(error)
            response.status(500).json({message: "failed to conect database", error})
        }
    }
}

module.exports = new UserController()