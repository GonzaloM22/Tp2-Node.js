import mongoose, { Schema } from 'mongoose';

const animeSchema = new Schema({
  title: { type: String, lowercase: true, require: true },
  description: { type: String, lowercase: true, require: true },
  image: { type: String, lowercase: true },
  category: { type: String, lowercase: true, require: true },
  ChapterList: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
});

export default mongoose.model('Anime', animeSchema);
