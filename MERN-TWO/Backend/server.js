import dotenv from 'dotenv'
dotenv.config({ path: 'backend/config/config.env' })

import app from './app.js'
import connectDataBase from './config/db.js'


const PORT = process.env.PORT || 7000

connectDataBase()
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})
