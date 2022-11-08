import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const { Schema } = mongoose;

const UserSchema = new Schema({
  //name: { type: String, require: true },
  email: { type: String, unique: true, lowercase: true, require: true },
  password: { type: String, require: true },
  registerDate: { type: Date, default: Date.now() },
  favAnimeList: { type: Array, default: [] },
});

UserSchema.pre('save', function (next) {
  let user = this;

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password) {
  let user = this;

  return bcrypt.compareSync(password, user.password);
};

export default mongoose.model('User', UserSchema);
