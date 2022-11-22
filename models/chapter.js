import mongoose, { Schema } from 'mongoose';

const chapterSchema = new Schema({
  title: { type: String, lowercase: true, require: true },
  descripction: { type: String, lowercase: true, require: true },
  urlVideo: { type: String, lowercase: true },
  AnimeOwner: { type: Schema.Types.ObjectId, ref: 'Anime' },
});

export default mongoose.model('Chapter', chapterSchema);
