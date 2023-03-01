const mongoose = require("mongoose");
const { dbName, dbPassword, dbUser } = require('./../config');

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.5fslsne.mongodb.net/${dbName}`);
        
        console.log('DB Online');
    } catch (error) {
        console.error(error);
        throw new Error('Error al iniciar BD, ver LOGS')
    }
}

module.exports = { dbConnection }