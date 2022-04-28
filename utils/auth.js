// fucntion that protects the dashboard page if user is not logged in
// will redirect to the login page
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;