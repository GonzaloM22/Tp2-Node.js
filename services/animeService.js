import Anime from '../models/anime.js';

const addAnime = (title, description, image, category) => {
  const newAnime = new Anime({ title, description, image, category });

  return new Promise((resolve, reject) => {
    newAnime.save((error) => {
      if (error) reject(error);

      resolve({
        status: 200,
        message: 'anime created sucessfully',
        newAnime,
      });
    });
  });
};

const showAnimes = () => {
  return new Promise((resolve, reject) => {
    Anime.find({}, (error, animes) => {
      if (error) {
        reject({ status: 500, message: 'request error', error });
      }

      resolve({ animes });
    });
  });
};

const showAnime = (id) => {
  let result;

  try {
    return new Promise((resolve, reject) => {
      Anime.findById(id, (error, anime) => {
        if (!anime) {
          reject({ status: 404, message: 'anime not found' });
        }

        resolve({ status: 200, message: 'request successful', anime });
      });
    });
  } catch (error) {
    return (result = { status: 500, message: 'bad request' });
  }

  return result;
};

const dropAnime = (id) => {
  try {
    return new Promise((resolve, reject) => {
      Anime.findByIdAndDelete(id, (error, anime) => {
        if (!anime) resolve({ status: 404, message: 'anime not found' });

        resolve({ status: 200, message: 'Anime has been erased', anime });
      });
    });
  } catch (error) {
    console.log(error);
    result = { status: 500, message: 'bad request' };
  }
};

const alterAnime = (id, title, description, image, category) => {
  return new Promise((resolve, reject) => {
    Anime.findByIdAndUpdate(
      id,
      { title, description, image, category },
      (error, animeUpdated) => {
        if (!animeUpdated) resolve({ status: 404, message: 'anime not found' });

        resolve({ status: 200, message: 'request successful', animeUpdated });
      }
    );
  });
};

export { addAnime, showAnimes, showAnime, dropAnime, alterAnime };
