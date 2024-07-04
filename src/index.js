const express = require('express')

const clientsRoutes = require('./routes/clients.routes')
const productRoutes = require('./routes/product.routes')


const app = express()
app.use(express.json())



app.use('/clients', clientsRoutes)
app.use('/products', productRoutes)


app.listen(3000, () => {
    console.log('Servidor online')
})


