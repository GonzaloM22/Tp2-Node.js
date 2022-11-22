import { validationResult } from 'express-validator';
import {
  addChapter,
  showChapters,
  showChapter,
  dropChapter,
  alterChapter,
} from '../services/chapterService.js';

const newChapter = async (req, res) => {
  const { AnimeId, title, description, urlVideo } = req.body;

  try {
    const resultValidation = validationResult(req);
    const hasError = resultValidation.throw();

    if (hasError) {
      return res.status(400).send({ message: resultValidation.errors[0].msg });
    }

    const result = await addChapter(
      AnimeId,
      title,
      description,
      urlVideo
    ).catch((error) => error);
    return res.status(result.status).send({
      message: result.message,
      chapter: result.newChapter,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'unexpected error',
      error,
    });
  }
};

const getChapters = async (req, res) => {
  const result = await showChapters();
  return res.status(200).send({ message: 'request successful', result });
};

const getChapter = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(404).send({ message: 'id not specified' });

  try {
    const result = await showChapter(id);

    return res
      .status(200)
      .send({ message: 'request successful', chapter: result.chapter });
  } catch (error) {
    console.log(error);
    return res.status(error.status).send({ message: error.message });
  }
};

const deleteChapter = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(404).send({ message: 'id not specified' });

  const result = await dropChapter(id).catch((error) => error);

  return res.status(result.status).send({ message: result.message });
};

const updateChapter = async (req, res) => {
  const { id, title, description, urlVideo } = req.body;

  try {
    const resultValidation = validationResult(req);
    const hasError = resultValidation.isEmpty();

    if (!hasError)
      return res.status(400).send({ message: resultValidation.errors[0] });

    const result = await alterChapter(id, title, description, urlVideo).catch(
      (error) => error
    );

    return res
      .status(result.status)
      .send({ message: result.message, animeUpdated: result.chapterUpdated });
  } catch (error) {
    console.log(error);
    return res.status(error.status).send({ message: error.message });
  }
};

export { newChapter, getChapters, getChapter, deleteChapter, updateChapter };
