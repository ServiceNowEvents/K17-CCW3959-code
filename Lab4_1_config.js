var config = {};  

// Replace <instance> with your Lab Instance prefix
config.instanceURL = 'https://<instance>.service-now.com';   

// OAuth Configuration  
config.oauth = {};  
config.oauth.authURL      = config.instanceURL + '/oauth_auth.do';  
config.oauth.tokenURL     = config.instanceURL + '/oauth_token.do';  

// Replace <glitch-project> with your project name
config.oauth.callbackURL  = 'https://<glitch-project>.glitch.me/auth/provider/callback';  

module.exports = config; 