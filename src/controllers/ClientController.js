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

    async listClients(request, response) {
        try {
           const data =  await this.database.query(`SELECT * from clients`)
           response.status(200).json({clients: data.rows})
        } catch (error) {
            response.status(500).json({message: 'Failed to retrieve clients', error: error.message})

        }
    }

    async deleteClients(request, response) {
        try{
            const clientId = request.params.id
            await this.database.query(`DELETE FROM clients WHERE id = $1`, [clientId])
            response.status(204).send()
        } catch (error) {
            response.status(500).json({message: 'Failed to delete client', error: error.message})

        }
    }

    async updateClient(request, response) {
        try {
            const id = request.params.id;
            const data = request.body;
        
            if (data.hasOwnProperty("cpf")) {
                return response.status(400).json({ mensagem: "The CPF cannot be modified" });
            }
        
            if (data.hasOwnProperty("name") && data.hasOwnProperty("email") && data.hasOwnProperty("contact")) {
                await this.database.query(`UPDATE clients SET name = $1, email = $2, contact = $3 where id =$4`, 
                    [data.name, data.email, data.contact, id]);
                response.status(201).json({ mensagem: "Updated successfully" });
        
            } else if (data.hasOwnProperty("name")) {
                await this.database.query(`UPDATE clients SET name = $1 where id =$2`, 
                    [data.name, id]);
                response.status(201).json({ mensagem: "Updated successfully" });
        
            } else if (data.hasOwnProperty("email")) {
                await this.database.query(`UPDATE clients SET email = $1 where id =$2`, 
                    [data.email, id]);
                response.status(201).json({ mensagem: "Updated successfully" });
        
            } else if (data.hasOwnProperty("contact")) {
                await this.database.query(`UPDATE clients SET contact = $1 where id =$2`, 
                    [data.contact, id]);
                response.status(201).json({ mensagem: "Updated successfully" });
        
            } else {
                return response.status(400).json({ mensagem: "No valid field to update" }); 
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({ mensagem: 'Failed to update the client data', error: error.message });
        }
      }


}

module.exports = ClientsController