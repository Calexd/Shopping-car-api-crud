const { DataTypes } = require('sequelize')
const conecction = require('../database/connections')
const {hashSync} = require('bcryptjs')

const User = conecction.define("users", {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password_hash: {
        type: DataTypes.STRING
    }
}, 
// {
//     paranoid: true  // (deletedAt require if parainoid is true)
// }
)

User.beforeSave((user) => {
 user.password_hash = hashSync(user.password_hash, 10)  // or await hash 
 return user
})

module.exports = User