import dotenv from 'dotenv';
dotenv.config({ path: 'config/config.env' });

process.on('uncaughtException', (err) => {
    console.error(`Error: ${err.message}`);
    console.error('Shutting down server due to uncaught exception');
    process.exit(1);
});


import app from './app.js';
import connectDB from './config/db.js';




const PORT = process.env.PORT || 7000;




connectDB();
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});


process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down, due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});

