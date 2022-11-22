import { check } from 'express-validator';

const validateAnime = [
  check('title').exists().notEmpty().withMessage('title is required'),
  check('description')
    .exists()
    .notEmpty()
    .withMessage('description is required'),
  check('image').exists().notEmpty(),
  check('category').exists().notEmpty(),
];

export default validateAnime;
