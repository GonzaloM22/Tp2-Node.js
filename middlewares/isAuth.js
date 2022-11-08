import { decodeToken } from '../services/loginService.js';

const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(404).send({ message: 'User is not logged' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const response = await decodeToken(token);
    req.user = response;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'error has ocurred ' });
  }
};

export default isAuth;
