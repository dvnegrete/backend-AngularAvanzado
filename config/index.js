require('dotenv').config();

const config = {
    port: process.env.PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    secretJWT: process.env.SECRET_JWT
};

module.exports = config;