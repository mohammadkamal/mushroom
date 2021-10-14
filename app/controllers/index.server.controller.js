exports.render = function (req, res) {
    res.render('index', {
        title: 'Hi there!',
        userFullName: req.user ? req.user.fullName : ''
    });
};