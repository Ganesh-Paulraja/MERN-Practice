import express from 'express'
const app = express()
import productRouts from './routes/productRoutes.js'

app.use(express.json())
app.use('/api/v1', productRouts)

export default app