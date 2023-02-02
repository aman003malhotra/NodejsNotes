const http = require('http');
const express = require('express');
const routes = require('./routes');
const bodyParser = require("body-parser");
const path = require("path");
const expresshbs = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRoutes = require("./routes/shop");
// function rqListener(req, res){

// }

// http.createServer(rqListener);


const app = express();

// for handle bars specially
app.engine('handlebars', expresshbs())
app.set('view engine', 'handlebars');

// setting the view engine to pug
// app.set('view engine', 'pug');

//setting the name of the folder which contains the templates 
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')))

//middle ware used directly
app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use((req,res,next) => {
    res.status(404).render('404.pug', {docTitle:"Page Not Found"})
});



app.listen(3000);
// const server = http.createServer(app);

// server.listen(3000);
