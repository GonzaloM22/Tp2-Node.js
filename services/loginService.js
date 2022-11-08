import jwt from 'jwt-simple';
import { DateTime } from 'luxon';

const createToken = (user) => {
  const payload = {
    sub: user._id,
    iat: DateTime.now().toMillis(),
    exp: DateTime.now().plus({ day: 14 }).toMillis(),
  };

  return jwt.encode(payload, process.env.SECRET_TOKEN);
};

const decodeToken = async (token) => {
  try {
    const payload = jwt.decode(token, process.env.SECRET_TOKEN);

    if (payload.exp <= DateTime.now().toMillis()) {
      return { status: 401, message: 'Token has expired' };
    }
    return payload.sub;
  } catch (error) {
    console.log(error);
  }
};

export { createToken, decodeToken };
