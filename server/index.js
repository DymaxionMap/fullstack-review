const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database');
let app = express();

const NUM_REPOS = 25;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  const { username } = req.body;
  github.getReposByUsername(username, (err, githubResponse, githubResponseBody) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
      return;
    }

    const githubRepos = JSON.parse(githubResponseBody);
    const repos = githubRepos.map(repo => {
      return ({
        repoId: repo.id,
        name: repo.name,
        username: repo.owner.login,
        url: repo.html_url,
        description: repo.description,
        starsCount: repo.stargazers_count,
        forksCount: repo.watchers_count,
      });
    });

    db.save(repos, (err, repos) => {
      if (err) {
        console.error(err);
        res.sendStatus(404);
        return;
      }

      res.sendStatus(200);
    });

  });
});

app.get('/repos', function (req, res) {
  db.find((err, repos) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
      return;
    }

    console.log('repos:', repos);
    repos.sort((a, b) => b.starsCount - a.starsCount );
    console.log('sorted repos:', repos);
    res.send(repos.slice(0, NUM_REPOS));
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

