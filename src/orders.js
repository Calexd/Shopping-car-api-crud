const express = require('express')
const Database = require('../src/database/connections');
const { Router } = require('express')

const ordersRoutes = new Router()
const database = new Database().database;

async function showOrders(request, response) {
    try {
        const shoppingCar = await database.query(`SELECT o.id AS order_id, o.total, o.address, o.observations, c.name AS client_name
            FROM orders o
            INNER JOIN clients c ON o.client_id = c.id`)
        
            response.status(200).json(shoppingCar.rows)
    } catch (error) {
        console.log(error)
        response.status(500).json({message: 'Failed to fecth order details', error: error.message})

    }
}


async function newOrder(request, response) {
    try {
        const data = request.body
        const items = data.items

        let total = 0
        items.forEach(item => {
            total += item.amount * item.price
        })

        const newOrder = await database.query(`INSERT INTO orders (client_id, total, address, observations) VALUES ($1, $2, $3, $4) RETURNING *`, 
            [data.client_id, total, data.address, data.observations]
        )

        const orderId = newOrder.rows[0].id


        for (const item of items) {
            await database.query('INSERT INTO orders_items (order_id, product_id, amount, price) VALUES ($1, $2, $3, $4)', 
                [orderId, item.product_id, item.amount, item.price]

            )
        }

        response.status(201).json({message: 'Order created successfully'})

    } catch (error) {
        console.log(error)
        response.status(500).json({message: 'Failed to create order', error: error.message})

    }
}

async function deleteOrder(request, response) {
    try{
        const orderId = request.params.id
        await database.query('DELETE FROM orders_items WHERE order_id = $1', [orderId])
        await database.query(`DELETE FROM orders WHERE id = $1`, [orderId]);
        response.status(204).send()
    } catch (error) {
        console.log(error)
        response.status(500).json({message: 'Failed to delete order', error: error.message})
    }
}



ordersRoutes.post('/new-order', newOrder)
ordersRoutes.get('/show-orders', showOrders)
ordersRoutes.delete('/delete-order/:id', deleteOrder)


module.exports = ordersRoutes;
