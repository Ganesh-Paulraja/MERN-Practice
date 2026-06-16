import express from 'express'
const app = express()
import productRouts from './routes/productRoutes.js'
// -----------------
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
// ------------------

import errorMiddleware from './middleware/error.js';


app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', productRouts)
app.use("/api/v1",userRoutes)
app.use(errorMiddleware);
 

export default app
