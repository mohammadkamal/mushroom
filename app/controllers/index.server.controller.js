exports.render = function (req, res) {
    res.render('index', {
        title: 'Hi there!',
        user: JSON.stringify(req.user)
    });
};