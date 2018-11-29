import jwt from 'jwt-simple';

const encodeToken = (payload) => {
  let token = jwt.encode(payload,"secret");
  return token;
};

const decodedToken = (token) =>{
  let decoded = jwt.decode(token,"secret");
  return decoded; 
}
// Access token required for a user
const accessTokenRequired = (req, res, next) => {
  let { token } = req.headers;
  if (token) {
    req.body.userId = decodedToken(token).userId;
    req.body.userType = decodedToken(token).userType;
    next();
  } else {
    res.status(400).send({ message: 'Not authorized to this page' });
  }
};

const adminTokenRequired = (req, res, next) => {
  const { token } = req.headers;
  req.body.userId = decodedToken(token).userId;
  req.body.userType = decodedToken(token).userType;

  if ( req.body.userType === 'Admin') {    
    next();
  } else {
    res.status(400).send({ message: 'Not authorized to this page' });
  }
};
export default { accessTokenRequired, encodeToken, adminTokenRequired };
