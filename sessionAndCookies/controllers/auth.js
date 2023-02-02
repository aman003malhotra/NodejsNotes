exports.getLogin = (req,res,next) => {
    res.render('auth/login', {
        path:'/login',
        pageTitle:'Login',
        isAuthenticated:req.isLoggedIn
    })
}

exports.postLogin = (req,res,next) => {
    //initially the value will be undefined which will be false
    // req.isLoggedIn = true;
// max age in seconds
    // res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10 Secure')

    req.session.isLoggedIn = true;
    res.redirect('/')
}

exports.postLogout = (req,res,next) => {
   req.session.destroy((err) => {
    console.log(err);
    res.redirect('/')
   })
}
