const Database = require('../database/connections')

class ClientsController{
    constructor() {
        this.database = new Database().database
        this.createClient = this.createClient.bind(this)
    }
    async createClient(request, response) {
        try {
            const data = request.body
            console.log(data)

            if (!data.name || !data.cpf || !data.email || !data.contact){
                return response.status(400).json("Name, email, cpf and contact details are required")
            }
            await this.database.query(
                `INSERT INTO clients(name, email, cpf, contact) values($1, $2, $3, $4)`,[data.name, data.email, data.cpf, data.contact]
            )
            response.status(201).json({ message: "Successfully registered"})
            
        } catch (error) {
            console.log(error, error.detail)
            response.status(500).json({
                message: `Client Registration unsuccessful, ${error.detail}`
            })            
        }
    }
}

module.exports = ClientsController