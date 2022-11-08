import User from '../models/user.js';
import { createToken } from '../services/loginService.js';

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  User.findOne({ email }, (error, user) => {
    if (error) {
      return res.status(500).send({ message: 'Error has occurred', error });
    }

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (!(password && user.comparePassword(password))) {
      return res.status(401).send({ message: 'User or Password incorrect' });
    }

    res
      .status(200)
      .send({ message: 'Login succesful', token: createToken(user) });
  });
};

const register = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    if (error) {
      return res.status(500).send({ message: 'Error has occurred', error });
    }

    if (user) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const newUser = new User({ email, password });

    newUser.save((error) => {
      if (error) {
        return res.status(500).send({ message: 'Unexpected error', error });
      }

      return res.status(200).send({
        message: 'Register succesful',
        newUser,
        token: createToken(newUser),
      });
    });
  });
};

const addFav = () => {};

export { login, register };
