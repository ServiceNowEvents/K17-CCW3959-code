// Passport Routes  
router.get('/auth/provider',          passport.authenticate('provider'));  
router.get('/auth/provider/callback', passport.authenticate('provider', { failureRedirect: '/login' }), 
    function(req, res) {
      res.cookie('loggedIn', 'true'); 
      res.redirect(301, '/#/tasks'); 
    }
);  