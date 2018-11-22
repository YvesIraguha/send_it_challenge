// Access token required for a user
const accessTokenRequired = (req, res, next) => {
  const { token } = req.body;
  if (token) {
    next();
  } else {
    res.status(400).send({ message: 'Not authorized to this page' });
  }
};

export default accessTokenRequired;
