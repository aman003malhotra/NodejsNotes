const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./router/feed');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const app = express();

const fileStorage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req,file, cb) => {
        cb(null, uuidv4())
    }
})

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use('/feed', feedRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message:message
    })

})

mongoose.connect('mongodb+srv://aman003malhotra:6284085887@cluster0.hcbyp.mongodb.net/newApp?retryWrites=true&w=majority')
.then(result => {
    console.log('Database connected');
    app.listen(8080);

})
.catch(err => {
    console.log(err)
})
