import jwt from 'jwt-simple';
import moment from 'moment';

const encodeToken = (user) => {
  const payload = {
    expiration: moment()
      .add(10, 'weeks')
      .unix(),
    iat: moment().unix(),
    sub: user,
  };
  const token = jwt.encode(payload, 'secret');
  return token;
};

const decodeToken = (token) => {
  const decoded = jwt.decode(token, 'secret');
  return decoded;
};
// Access token required for a user
const accessTokenRequired = (req, res, next) => {
  const { token } = req.headers;
  if (token === undefined || token === null) {
    res.status(400).send({ error: 'Not authorized to this page' });
  } else {
    const now = moment().unix();
    const decodedToken = decodeToken(token);
    if (now > decodedToken.expiration) {
      res.status(400).send({ error: 'Token expired' });
    } else {
      req.body.userId = decodedToken.sub.userId;
      req.body.userType = decodedToken.sub.userType;
      next();
    }
  }
};

const adminTokenRequired = (req, res, next) => {
  const token = req.headers.token;
  if (token != undefined) {
    const now = moment().unix();
    const decodedToken = decodeToken(token);
    if (now > decodedToken.expiration) {
      res.status(400).send({ error: 'Token expired' });
    } else {
      req.body.userId = decodedToken.sub.userId;
      req.body.usertype = decodedToken.sub.userType;
      if (req.body.usertype === 'Admin') {
        next();
      } else {
        res.status(403).send({ error: 'Not authorized to this page' });
      }
    }
  } else {
    res.status(400).send({ error: 'Not authorized to this page' });
  }
};
export default { accessTokenRequired, encodeToken, adminTokenRequired };
