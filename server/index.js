const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  const { username } = req.body;
  github.getReposByUsername(username, (err, githubResponse, githubResponseBody) => {
    if (err) {
      throw err;
    }

    console.log('Github response body:');
    console.log(githubResponseBody)
    res.send(githubResponseBody);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

