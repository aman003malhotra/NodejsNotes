const http = require('http');
const express = require('express');
const routes = require('./routes');
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require('./routes/admin');
const shopRoutes = require("./routes/shop");
// function rqListener(req, res){

// }

// http.createServer(rqListener);


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')))

//middle ware used directly
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
});



app.listen(3000);
// const server = http.createServer(app);

// server.listen(3000);
