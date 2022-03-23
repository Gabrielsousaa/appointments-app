const express = require('express')
const app = express();
const router = express.Router()
const bodyParser = require('body-parser')
const consign = require('consign')
const path = require('path');


app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs')



consign({ cwd: "src" })
    .include('models')
    .then('/database/database.js')
    .then('/routes/')
    .then('/controllers/')
    .into(app, router)

module.exports = app