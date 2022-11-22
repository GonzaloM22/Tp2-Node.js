import User from '../models/user.js';
import { createToken } from '../services/loginService.js';

const register = (email, password) => {
  const newUser = new User({ email, password });

  return new Promise((resolve, reject) => {
    User.findOne({ email }, (error, user) => {
      if (error) {
        reject({ status: 500, message: 'Error has occurred', error });
      }

      if (user) {
        reject({ status: 400, message: 'Email already exists' });
      }

      newUser.save((error) => {
        if (error) {
          reject({ status: 500, message: 'Unexpected error', error });
        }

        resolve({
          status: 200,
          message: 'Register successful',
          newUser,
          token: createToken(newUser),
        });
      });
    });
  });
};

const login = async (email, password) => {
  let result;

  try {
    const user = await User.findOne({ email });
    if (!user) return (result = { status: 404, message: 'user not found' });

    if (!(password && user.comparePassword(password)))
      return (result = { status: 401, message: 'user or password incorrect' });

    result = {
      status: 200,
      message: 'Login successful',
      token: createToken(user),
    };
  } catch (error) {
    console.log(error);
  }

  return result;
};

const addFav = async (idUser, idAnime) => {
  try {
    const userUpdated = await User.findById(idUser);

    if (!userUpdated)
      return {
        status: 404,
        message: 'User not found',
      };

    userUpdated.favsAnimeList.push(idAnime);

    await userUpdated.save();
    return {
      status: 200,
      message: 'Anime added successfully',
      userUpdated,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: 'request error',
      error,
    };
  }
};

export { register, login, addFav };
