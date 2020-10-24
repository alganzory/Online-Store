// isAuth is the middleware that will be used if the user is already authenticated (logged in)
exports.isAuth = (req, res, next) => {
  if (req.session.userId) next();
  else res.redirect("/login");
};

// notAuth is the middleware that will be used if the user is not yet authenticated (not logged in)
exports.notAuth = (req, res, next) => {
  if (!req.session.userId) next();
  else res.redirect("/");
};
