const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  repoId: { type: Number, unique: true },
  name: String,
  username: String,
  url: String,
  description: String,
  starsCount: Number,
  forksCount: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  Repo.create(repos, callback);
}

module.exports.save = save;