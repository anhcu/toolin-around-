// Place withAuth inside a router.get to check for login before proceeding
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

// EXPORT MIDDLEWARE FOR USE IN APPLICATION
module.exports = withAuth;
