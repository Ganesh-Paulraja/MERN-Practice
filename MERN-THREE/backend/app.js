import express from 'express'
const app = express()


//Middleware – handle incoming json
app.use(express.json())




export default app