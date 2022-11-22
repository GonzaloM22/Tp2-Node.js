import { check } from 'express-validator';

const validateUser = [
  check('email')
    .exists()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('invalid email'),
  check('password').exists().notEmpty().withMessage('Password is required'),
];

export default validateUser;
