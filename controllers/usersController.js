import {
  register as registerService,
  login as loginService,
  addFav,
} from '../services/userService.js';
import { validationResult } from 'express-validator';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const resultValidation = validationResult(req);
    const hasError = resultValidation.throw();

    if (hasError) {
      return res.status(400).send({ message: resultValidation.errors[0].msg });
    }

    const result = await loginService(email, password).catch((error) => error);

    return res.status(result.status).send({
      message: result.message,
      token: result.token,
    });
  } catch (error) {
    return res.status(500).send({ message: 'request error', error });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const resultValidation = validationResult(req);
    const hasError = resultValidation.throw();

    if (hasError) {
      return res.status(400).send({ message: resultValidation.errors[0].msg });
    }

    const result = await registerService(email, password).catch(
      (error) => error
    );
    return res.status(result.status).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const newFav = async (req, res) => {
  const { idUser, idAnime } = req.body;

  try {
    const result = await addFav(idUser, idAnime).catch((error) => error);

    return res
      .status(result.status)
      .send({ message: result.message, userUpdated: result.userUpdated });
  } catch (error) {
    res.status(500).send(error);
  }
};

export { login, register, newFav };
