import dotenv from 'dotenv'
dotenv.config({path: 'backend/config/config.env'})


import app from './app.js'
const PORT = process.env.PORT || 7000

app.get("/test", (req, res) => {
  res.json({ message: "Test route working" });
});


const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})


