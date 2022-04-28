const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorMiddleware');

//routes

const GoalsRoutes = require('./routes/goals');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cors());


app.use('/api/goals',GoalsRoutes);
app.use(errorHandler);


const port = process.env.PORT || 5000;  


app.listen(port,() =>{
    console.log(`The app is running on port http://localhost:${port}`);
});