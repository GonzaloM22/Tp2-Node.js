import { check } from 'express-validator';

const validateChapter = [
  check('AnimeId').exists().notEmpty().withMessage('AnimeId is required'),
  check('title').exists().notEmpty().withMessage('title is required'),
  check('description').exists().notEmpty(),
  check('urlVideo').exists().notEmpty(),
];

export default validateChapter;
