module.exports = {
    db: 'mongodb://localhost/mushroom-book-test',
    sessionSecret: 'testSessionSecret',
    facebook: {
        clientID: '405767307591076',
        clientSecret: '3f5a5bf3de527b7aeb02fb76566d7a01',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback',
        profileFields: ['id', 'name', 'emails']
    }
};