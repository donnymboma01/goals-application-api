const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorMiddleware');

//routes

const GoalsRoutes = require('./routes/goals');
const connectDB = require('./config/database');
const UserRoutes = require('./routes/user');

connectDB(); //-> Better like this.

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cors());


app.use('/api/goals',GoalsRoutes);
app.use('/api/user',UserRoutes);
app.use(errorHandler);


const port = process.env.PORT || 5000;  


app.listen(port,() =>{
    console.log(`The app is running on port http://localhost:${port}`);
});