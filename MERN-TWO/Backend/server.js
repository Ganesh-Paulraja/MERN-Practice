import app from "./app.js";
import dotenv from 'dotenv'

dotenv.config({path : 'backend/config/config.env'})

const PORT = process.env.PORT || 7500

// sample get request
app.get('/test', (req,res) => {
    // res.send('sample send request')
    res.json({message: 'json send message'})
})


app.listen(PORT, () => {
    console.log('server is running on PORT', PORT)
})
