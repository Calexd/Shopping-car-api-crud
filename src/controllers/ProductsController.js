const Database = require('../database/connections')

class ProductController{
    constructor() {
        this.database = new Database().database
        this.createProduct = this.createProduct.bind(this)
        this.deletarProduct = this.deletarProduct.bind(this)
        this.showProductDetail = this.showProductDetail.bind(this)
    }

    async createProduct(request, response) {
        try {
            const data = request.body
            console.log(data)
            

            if (data.voltage !== '110' && data.voltage !== '220'){
                return response.status(400).json({message:"Voltage somente admite: '110' ou '220'"})
            }

            await this.database.query(
                `INSERT INTO products(name, amount, color, voltage, description, category_id) values($1, $2, $3, $4, $5, $6)`,[data.name, data.amount, data.color, data.voltage, data.description, data.category_id]
            )

            response.status(201).json({ message: "Successfully registered"})
            
        } catch (error) {
            console.log(error, error.detail)
            response.status(500).json({
                message: `Product Registration unsuccessful, ${error.detail}`
            })            
        }
    }

    async showProducts(request, response){
        try {
            let dados = request.body
            if (dados.name) {
                const productsFilter = await this.database.query(
                  "select * from products where name ilike $1",
                  [`%${dados.name}%`]
                );
            }
            const products = await this.database.query(
                `SELECT * FROM products`            
            )
            response.status(200).json(products.rows);

            
        } catch (error) {
        console.log("Error ao ler os dados dos Productos", error);
        response
        .status(500)
        .json({ mensagem: "Não foi possivel ler os dados de Productos", error });

        }
    }

    
    async showProductDetail(request, response) {
        try {
            const id = request.params.id
            const productDetail = await this.database.query(`SELECT p.id, p.amount, p.color, p.voltage, p.description, c.name AS category_name
            FROM products p
            INNER JOIN categories c ON p.category_id = c.id
            WHERE p.id = $1`, [id])
            
            if (productDetail.rows.length === 0) {
                return response.status(404).json({message: 'Produto não encontrado'})
            }

            response.status(200).json(productDetail.rows[0])


        } catch (error) {
            {
            console.log("Error ao procurar os dados do Producto", error);
            response
            .status(500)
            .json({ mensagem: "Não foi possivel acessar os dados de Productos", error });
    
            }

        }
    }

    async deletarProduct(request, response) {
        try {
            const id = request.params.id
            console.log('id =', id)

        if (!id) {
            return response.status(400).json({ mensagem: "ID é obrigatório" })
        } else {
            await this.database.query(`DELETE FROM products where id = $1`, [id]);
            response.status(204).json();                                                                                                                                                                    
        }                   

        } catch (error) {
            console.log("Error ao deletar os dados dos Productos", error);
        response
        .status(500)
        .json({ mensagem: "Não foi possivel deletar os dados de Productos", error });

        }
        }
    }





module.exports = ProductController