import {
  addAnime,
  showAnimes,
  showAnime,
  dropAnime,
  alterAnime,
} from '../services/animeService.js';
import { validationResult } from 'express-validator';

const newAnime = async (req, res) => {
  const { title, description, image, category } = req.body;

  try {
    const resultValidation = validationResult(req);
    const hasError = resultValidation.throw();

    if (hasError) {
      return res.status(400).send({ message: resultValidation.errors[0].msg });
    }

    const result = await addAnime(title, description, image, category);

    return res.status(result.status).send({
      message: result.message,
      anime: result.newAnime,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error,
    });
  }
};

const getAnimes = async (req, res) => {
  const result = await showAnimes();
  return res.status(200).send({ message: 'request successful', result });
};

const getAnime = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(404).send({ message: 'id not specified' });

  try {
    const result = await showAnime(id);

    return res
      .status(result.status)
      .send({ message: result.message, anime: result.anime });
  } catch (error) {
    console.log(error);
    return res.status(error.status).send({ message: error.message });
  }
};

const deleteAnime = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(404).send({ message: 'id not specified' });

  const result = await dropAnime(id).catch((error) => error);

  return res.status(result.status).send({ message: result.message });
};

const updateAnime = async (req, res) => {
  const { id, title, description, image, category } = req.body;

  if (!id) return res.status(404).send({ message: 'id not specified' });

  try {
    const resultValidation = validationResult(req);
    const hasError = resultValidation.throw();

    if (hasError)
      return res.status(400).send({ message: resultValidation.errors[0].msg });

    const result = await alterAnime(
      id,
      title,
      description,
      image,
      category
    ).catch((error) => error);

    return res
      .status(result.status)
      .send({ message: result.message, animeUpdated: result.animeUpdated });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "something's wrong" });
  }
};

export { newAnime, getAnimes, getAnime, deleteAnime, updateAnime };
