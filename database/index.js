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

const NUM_REPOS = 25;

const find = (callback) => {
  Repo.find()
    .select('name username url description starsCount')
    .sort({ starsCount: 'descending' })
    .limit(NUM_REPOS)
    .exec(callback);
}

module.exports.save = save;
module.exports.find = find;