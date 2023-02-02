const express = require('express');
const { check, body  } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup',
    [
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, {req}) => {
        User.findOne({ email: value })
        .then(userDoc => {
          if (userDoc) {
            console.log(userDoc)
            return Promise.reject('E-Mail exists already, please pick a different one.')
          }
        })
    }),
    body('password', "Please enter a password with only numbers and text and at least 5 character" )
    .isLength({min:5})
    .isAlphanumeric(),

    body('confirmPassword')
    .custom((value, {req}) => {
        if (value !== req.body.password){
            throw new Error('Password are not equal')
        }
    })
    ], authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
