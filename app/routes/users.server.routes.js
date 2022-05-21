var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function (app) {
    // api calls
    app.route('/api/auth/signup').post(users.signupApi);
    app.route('/api/auth/signin').post(passport.authenticate('local'));

    app.route('');

    // frontend calls
    app.route('/signup').get(users.renderSignup).post(users.signup);
    app.route('/signin').get(users.renderSignin).post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    }));

    app.get('/signout', users.signout);
};