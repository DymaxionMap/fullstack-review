const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const repoSchema = new mongoose.Schema({
  repoId: { type: Number, unique: true },
  name: String,
  username: String,
  url: String,
  description: String,
  starsCount: Number,
  forksCount: Number,
});

const Repo = mongoose.model('Repo', repoSchema);

// FOR TESTING PURPOSES
// Repo.deleteMany(err => {
//   if (err) {
//     throw err;
//   }
// });

const save = (repos, callback) => {
  Repo.create(repos, callback);
}

const find = (callback) => {
  Repo.find(callback);
}

module.exports.save = save;
module.exports.find = find;