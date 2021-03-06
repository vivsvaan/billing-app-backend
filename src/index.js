const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const orderRouter = require('./routers/order')
const itemRouter = require('./routers/item')
const customerRouter = require('./routers/customer')

const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json())
app.use(userRouter)
app.use(orderRouter)
app.use(itemRouter)
app.use(customerRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
