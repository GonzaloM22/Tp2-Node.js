import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();

app.use('/api', routes);

mongoose.connect(
  process.env.DB_MONGO,
  { UseNewUrlParser: true },
  (error, response) => {
    if (error) {
      return console.log(`Database connection error ${error}`);
    }
    console.log('Database connection succesful');

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }
);
