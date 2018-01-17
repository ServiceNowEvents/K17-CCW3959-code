var session = serverRequest.session;
if (session && session.passport && session.passport.user.accessToken) {
    var SNTask = serverRequest.app.get('snTask');
    var options = serverRequest.app.get('options');
    var snTask = new SNTask(config.instanceURL, session.passport.user.accessToken, options);