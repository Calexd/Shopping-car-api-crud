const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const conecction = require('./database/connections')


 
const PORT_API = process.env.PORT_API

class Server {
    constructor (server = express()){
        this.middlewares(server)
        this.database()
        server.use(routes)
        this.initializeServer(server)
    }

    async middlewares(app){
        app.use(cors())
        app.use(express.json())

    } 
    async database(){
        try {
            await conecction.authenticate()
            console.log('DataBase conected')

        } catch (error) {
            console.log('Data base not conected', error)
        }
        
    }
    async initializeServer(app){
        app.listen(PORT_API, () => {
            console.log(`Server is running in port ${PORT_API}` )
        })
    }

}



module.exports = { Server }

