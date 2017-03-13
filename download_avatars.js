var request = require('request');
var fs = require('fs');
const credentials = require('./credentials');

var owner = process.argv[2], repo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  const GITHUB_USER = credentials.userName;
  const GITHUB_TOKEN = credentials.token;

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var requestOptions = {
    url: requestURL,
    headers: {
      'User-Agent': 'borishaw/github-avatar-downloader'
    }
  };
  request.get(requestOptions, function (error, response, body) {
    cb(error, body)
  })
    
}

getRepoContributors(owner, repo, function(err, result) {

  if (err) {
    console.log("Errors:", err);
  } else {
    var counter = 0;
    result = JSON.parse(result);
    for (counter; counter < result.length; counter++){
      var filePath = "avatars/" + result[counter].login + ".jpeg";
      var imgUrl = result[counter].avatar_url;
      downloadImageByURL(imgUrl, filePath);
    }
    console.log("All avatar images downloaded.");
  }
});

function downloadImageByURL(url, filePath) {
  var image = '';
  request.get(url)
    .on('error', function (error) {
      console.log(error);
    })
    .on('response', function (response) {
      response.on('error', function (error) {
        console.log(error);
      })
        .on('data', function (chunk) {
          image += chunk;
        })
        .pipe(fs.createWriteStream(filePath))
    })
}