const passport = require("passport");
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user')
const jwt = require('jsonwebtoken')

passport.use(new BearerStrategy((token, done) =>{
    console.log(token);
    const decoded = jwt.decode(token, 'shhhhh')
    console.log(decoded);
      User.findById(decoded.userId,  (err, user)=> {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));