import express from 'express';
import { register, login, newFav } from '../controllers/usersController.js';
import {
  newAnime,
  getAnimes,
  getAnime,
  deleteAnime,
  updateAnime,
} from '../controllers/animeController.js';
import {
  newChapter,
  getChapters,
  getChapter,
  deleteChapter,
  updateChapter,
} from '../controllers/chaptersController.js';
import isAuth from '../middlewares/isAuth.js';
import validateUser from '../controllers/schemas/userSchema.js';
import validateAnime from '../controllers/schemas/animeSchema.js';
import validateChapter from '../controllers/schemas/chapterSchema.js';

const router = express('route');

//Auth
router.post('/login', validateUser, login);
router.post('/register', validateUser, register);
router.post('/favorite', isAuth, newFav);

//Animes
router.post('/animes', isAuth, validateAnime, newAnime);
router.get('/animes', isAuth, getAnimes);
router.get('/anime', isAuth, getAnime);
router.delete('/anime', isAuth, deleteAnime);
router.put('/anime', isAuth, validateAnime, updateAnime);

//chapters
router.post('/chapters', isAuth, validateChapter, newChapter);
router.get('/chapters', isAuth, getChapters);
router.get('/chapter', isAuth, getChapter);
router.delete('/chapter', isAuth, deleteChapter);
router.put('/chapter', isAuth, validateChapter, updateChapter);

export default router;
