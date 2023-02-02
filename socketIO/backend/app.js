const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
// const { Server } = require("socket.io");
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization', "allowedHeaders,socket.io");
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://aman003malhotra:6284085887@cluster0.hcbyp.mongodb.net/messages?retryWrites=true&w=majority'
  )
  .then(result => {
    console.log("hello")
    const server = app.listen(8080, () => {
      console.log('server started 8080 port.');
  })
  const io = require("socket.io")(server, {
      cors: {
          allowedHeaders: ["socket.io"],
          credentials: true
      }
  });
  io.on("connection", (socket) => {
      console.log('connected!');
  });
    io.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  })
  .catch(err => console.log(err));
