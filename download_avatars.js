var request = require('request');
var fs = require('fs');
const credentials = require('./credentials');

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

getRepoContributors("jquery", "jquery", function(err, result) {

  console.log("Errors:", err);


  var avatarArray = [];
  var counter = 0;
  result = JSON.parse(result);
  for (counter; counter < result.length; counter++){
    avatarArray.push(result[counter].avatar_url);
  }
  console.log(avatarArray);
  return avatarArray;
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
        .on('end', function () {
          console.log("Avatar image downloaded.")
        })
        .pipe(fs.createWriteStream(filePath).on('finish', function () {
          console.log("Avatar image saved.");
        }))
    })
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");