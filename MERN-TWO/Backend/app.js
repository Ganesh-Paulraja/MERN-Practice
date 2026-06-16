import express from 'express';
import productRoutes from './routes/productRoutes.js';
import errorMiddleware from './middleware/error.js'; // ✅ import


const app = express();


// Middleware – handle incoming JSON
app.use(express.json());
app.use('/api/v1', productRoutes);


app.use(errorMiddleware); // ✅ always last — after all routes


export default app;
