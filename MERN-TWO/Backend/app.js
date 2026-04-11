import express from 'express'
const app = express()
import productRouts from './routes/productroutes.js'
import errorHandlingMiddleware from './middleware/error.js'

app.use(express.json())
app.use('/api/v1', productRouts)
app.use(errorHandlingMiddleware)


export default app