require('dotenv').config()
const mongoose = require('mongoose');
const connection = mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection database... Successful')
    }).catch(error => {
        console.log('Connection database... Failed => ' + error)
    });

module.exports = connection