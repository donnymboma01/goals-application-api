const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        const connexion = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected : ${connexion.connection.host}`)
    }catch(err){
        console.log("Error while trying to connect to the database : ",err);
        process.exit(1);
    }
};


module.exports = connectDB;