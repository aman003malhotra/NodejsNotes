const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://aman003malhotra:6284085887@cluster0.hcbyp.mongodb.net/noderefresher?retryWrites=true&w=majority'
    
const app = express();
const store = new MongoDBStore({
  uri:MONGODB_URI,
  collection:'sessions'
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// resave tells if the session is not resaved on every request or response
app.use(session(
  {
    secret:'my secret', 
    resave: false, 
    saveUninitialized:false,
    store:store
  }
  ));

app.use((req, res, next) => {
  User.findById('62dd19c5496f434090b56036')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    User.findOne().then(user => {
      if(!user){
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    })
    
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
