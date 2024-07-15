const Database = require('../database/connections')
const Client = require('../models/client') 


class ClientsController{
    

    async createClient(request, response) {
    try {
        const data = request.body;
        if (!data.name || !data.cpf || !data.email || !data.contact) {
            return response.status(400).json("Name, email, cpf and contact details are required");
        }

        const clients = await Client.create(data);
        response.status(201).json(clients);
    } catch (error) {
        console.log(error, error.detail);
        response.status(500).json({
            message: `Client Registration unsuccessful, ${error.detail}`
        });
    }
}

    async listClients(request, response) {
        try {
            const clients = await Client.findAll()
            response.status(201).json(clients)
        } catch (error) {
            console.log(error, error.detail);
            response.status(500).json({
                message: `Clients list unsuccessful conecction, ${error.detail}`
            });
        }
    }



    async deleteClients(request, response) {
        try{
            const clientId = request.params.id
            const client = await Client.findByPk(clientId)

            if(!client) {
                return response.status(404).json({
                    mensagem: "No client found with that ID"
                })
            }
            await client.destroy()

            response.status(204).json()
        } catch (error) {
            response.status(500).json({message: 'Failed to delete client', error: error.message})
        }
    }



    async updateClient(request, response) {
        try {
            const id = request.params.id;
            const data = request.body;
            const client = await Client.findByPk(id)
            if(!client) {
                return response.status(404).json({
                    mensagem: "No client found with that ID"
                })
            }
            if (data.hasOwnProperty("cpf")) {
                 return response.status(400).json({ mensagem: "The CPF cannot be modified" });
                 }
            
            client.nome = data.nome
            client.email = data.email
            client.contact = data.contact
            await client.save()
            
        } catch (error) {
            console.log(error);
            response.status(500).json({ mensagem: 'Failed to update the client data', error: error.message });
        }
      }

      async showClient(request, response) {
        try {
            const id = request.params.id
            const client = await Client.findByPk(id)
            if(!client) {
                return response.status(404).json({
                    mensagem: "No client found with that ID"
                })
            }
            response.status(201).json(client)
        } catch (error) {
            console.log(error);
            response.status(500).json({ mensagem: 'Failed to find the client data', error: error.message });
        }
         
      }



}

module.exports = ClientsController