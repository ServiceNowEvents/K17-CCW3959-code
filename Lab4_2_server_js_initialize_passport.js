// Set up Passport  
var config = require('./config');  
var passport = require('passport')  
, OAuth2Strategy = require('passport-oauth').OAuth2Strategy;  

app.use(passport.initialize());  

passport.use('provider', new OAuth2Strategy({  
    authorizationURL: config.oauth.authURL,  
    tokenURL:         config.oauth.tokenURL,  
    clientID:         process.env.OAUTH_CLIENT_ID,  
    clientSecret:     process.env.OAUTH_CLIENT_SECRET,  
    callbackURL:      config.oauth.callbackURL  
}, function(accessToken, refreshToken, profile, done) {  
        var tokenInfo = {};  
        tokenInfo.accessToken  = accessToken;  
        tokenInfo.refreshToken = refreshToken;  
        tokenInfo.profile      = profile;  
        console.log(tokenInfo);  
        done(null, tokenInfo);  
    }  
));  

passport.serializeUser(function(user, done) {  
    done(null, user);  
});  

passport.deserializeUser(function(id, done) {  
    done(null, id);  
});  