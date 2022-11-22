import Anime from '../models/anime.js';
import Chapter from '../models/chapter.js';

const addChapter = async (AnimeId, title, description, urlVideo) => {
  const AnimeFound = await Anime.findById(AnimeId);

  if (!AnimeFound)
    return {
      status: 404,
      message: "anime doesn't exist",
    };

  const newChapter = new Chapter({ title, description, urlVideo });

  return new Promise((resolve, reject) => {
    newChapter.save((error) => {
      if (error) {
        reject({ status: 500, message: 'request error', error });
      }

      resolve({
        status: 200,
        message: 'chapter created sucessful',
        newChapter,
      });
    });

    AnimeFound.ChapterList.push(newChapter.id);
    AnimeFound.save();
  });
};

const showChapters = () => {
  return new Promise((resolve, reject) => {
    Chapter.find({}, (error, chapters) => {
      if (error) {
        reject({ status: 500, message: 'request error', error });
      }

      resolve({ chapters });
    });
  });
};

const showChapter = (id) => {
  try {
    return new Promise((resolve, reject) => {
      Chapter.findById(id, (error, chapter) => {
        if (!chapter) {
          reject({ status: 404, message: 'chapter not found' });
        }

        resolve({ message: 'request successful', chapter });
      });
    });
  } catch (error) {
    return { status: 500, message: 'bad request' };
  }
};

const dropChapter = (id) => {
  try {
    return new Promise((resolve, reject) => {
      Chapter.findByIdAndDelete(id, (error, chapter) => {
        if (!chapter) {
          reject({ status: 404, message: 'chapter not found' });
        }

        resolve({ status: 200, message: 'request successful', chapter });
      });
    });
  } catch (error) {
    return { status: 500, message: 'bad request' };
  }
};

const alterChapter = (id, title, description, urlVideo) => {
  try {
    return new Promise((resolve, reject) => {
      Chapter.findByIdAndUpdate(
        id,
        { title, description, urlVideo },
        (error, chapterUpdated) => {
          if (!chapterUpdated) {
            reject({ status: 404, message: 'chapter not found' });
          }

          resolve({
            status: 200,
            message: 'request successful',
            chapterUpdated,
          });
        }
      );
    });
  } catch (error) {
    return { status: 500, message: 'bad request' };
  }
};

export { addChapter, showChapters, showChapter, dropChapter, alterChapter };
