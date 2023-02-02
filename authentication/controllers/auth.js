const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:'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'
  }
}))

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0){
    message = message[0]
  } else{
    message = null;
  }

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0){
    message = message[0]
  } else{
    message = null;
  }
  
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message

  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email:email})
    .then(user => {
      if (!user) {
        console.log('invalid user')
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }
      bcrypt
      .compare(password, user.password)
      .then(pwdMatch => {
        if (pwdMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            return res.redirect('/');
        });
      }
        req.flash('error', 'Invalid email or password');
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login')
      })
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;  
  const confirmPassword = req.body.confirmPassword;  
  User.find({email:email})
  .then(userDoc => {
    if(userDoc.length != 0) {
      req.flash('error', 'Email exists already');
      return res.redirect('/signup');
    }
    return bcrypt.hash(password, 12)
    .then(hashpassword => {
      const user = new User({
        email:email,
        password:hashpassword,
        cart:{items: []}
      });
      return user.save();
    })
    .then(result => {
      transporter.sendMail({
        to:email,
        from:'aman003malhotra@gmail.com',
        subject:'Signup succeeded',
        html:'<h1>You signed up successfully</h1>'
      })
      res.redirect('/login')
    })
  })
  .catch(err => {
    console.log(err);
  })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};


exports.getReset = (req,res,next) => {
  let message = req.flash('error');
  if (message.length > 0){
    message = message[0]
  } else{
    message = null;
  }
  res.render('auth/reset', {
    path:'/reset',
    pageTitle:'Reset Password',
    errorMessage:message,
  })
}

exports.postReset = (req, res, next) =>{
  crypto.randomBytes(32, (err, buffer)=> {
    if(err){
      console.log("error", err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({email:req.body.email})
    .then(user => {
      console.log(user);
      if(!user){
        req.flash('error', 'No Account with that email exists' );
        return res.redirect('/reset');
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      return user.save();
    })
    .then(result => {
      res.redirect('/')
      transporter.sendMail({
        to:req.body.email,
        from:'aman003malhotra@gmail.com',
        subject:'Signup succeeded',
        html:`
        <p>You requested a password reset</p>
        <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
        `
      })
    })
    .catch()
  })
}

exports.getNewPassword = (req,res,next) => {
  const token = req.params.token;
  User.findOne({resetToken: token, resetTokenExpiration:{$gt: Date.now()}})
  .then(user => {
    let message = req.flash('error');
    if (message.length > 0){
      message = message[0]
    } else{
      message = null;
    }
    res.render('auth/new-password', {
      path:'/new-password',
      pageTitle:'New Password',
      errorMessage:message,
      userId:user._id.toString(),
      passwordToken:token,
    })
  })
  .catch(err => {
    console.log(err);
  })
}

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({resetToken: passwordToken, resetTokenExpiration:{$gt: Date.now()}, _id:userId})
  .then(user => {
    resetUser = user;
    return bcrypt.hash(newPassword, 12)
  })
  .then(hashedPasssword => {
    resetUser.password = hashedPasssword;
    resetUser.resetToken = null;
    resetUser.resetTokenExpiration = null;
    console.log(resetUser)
    return resetUser.save();
  })
  .then(result => {
    return res.redirect('/login')
  })
  .catch(err => {
    console.log(err)
  })
}